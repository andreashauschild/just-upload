import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  AfterFileSend,
  BeforeFileSend,
  formatBytesToHumanReadable,
  JustUploadService,
  MultipartFormUpload,
  RequestParams,
  updateFileList,
  UploadConfig,
  UploadFile,
  UploadState
} from 'just-upload';

@Component({
  selector: 'app-basic-multipart-example',
  template: `
    <input #fileUpload type="file">
    <p>Limit: {{limitHumanReadable}}</p>
    <input (click)="uploadAll()" value="Upload All" type="button">
    <table style="border: solid 1px;width: 800px; ">
      <tr>
        <th>File</th>
        <th style="width: 150px">Data Send</th>
        <th style="width: 150px">%</th>
        <th style="width: 150px">Status</th>
        <th>Upload</th>
        <th>Remove</th>
      </tr>
      <tr *ngFor="let file of files ">
        <td>{{file.name}} </td>
        <td>{{file.loadedHumanReadable}}</td>
        <td>{{file.loadedPercent}}</td>
        <td>
          {{file.state}}
        </td>
        <td><input *ngIf="file.state!==STATES.SIZE_LIMIT_EXCEEDED" (click)="upload?.uploadFile(file)" value="upload" type="button"></td>
        <td><input (click)="remove(file)" value="remove" type="button"></td>
      </tr>
    </table>
  `,
  styles: [`
    table, th, td, input, p {
      padding: 5px;
      font-family: monospace;
      border: 1px solid black;
    }
  `]
})
export class BasicMultipartExampleComponent implements AfterViewInit {

  @ViewChild("fileUpload", {static: false})
  fileUpload: ElementRef | undefined;

  finished = false;

  files: UploadFile[] = []

  upload?: MultipartFormUpload;
  limitHumanReadable: string | undefined;
  STATES = UploadState;

  config: UploadConfig;


  constructor(private http: HttpClient, private uploadService: JustUploadService) {
    this.config = {
      url: "http://localhost:8080/api/basic-upload/multipart-form",
      method: "POST",
      multi: true,
      maxFileSize: 100 * 1024, // 100kb
      uploadImmediately: false,
      accept:'*',

      beforeFileSendHook(before: BeforeFileSend) {
        const file = {...before.file}

        // Add query parameter to the post request
        const params: RequestParams = {
          query: {
            fileId: file.fileId,
            fileName: file.name
          },
          // Add header to the post request, e.g. for Authorization
          header: {...before.params.header, 'Authorization': 'Basic d2lraTpwZWRpYQ== '}
        }


        return params;
      },
      afterFileSendHook(after: AfterFileSend) {

        if (after.response?.status == 200) {
          // do something

        }
      }
    }
    this.limitHumanReadable = formatBytesToHumanReadable(this.config.maxFileSize!);
  }

  // Be aware that we user AfterViewInit here and no onInit
  ngAfterViewInit(): void {
    this.upload = this.uploadService.createMultipartFormUpload(this.fileUpload!, this.config);
    this.upload.onFileProcessed().subscribe(updatedFile => {
      this.files = updateFileList(this.files, updatedFile)
    });

    this.upload.onFiledAdded().subscribe(fi => {
      this.files.push(fi);
    });
  }

  remove(file: UploadFile) {
    this.files = this.files.filter(f => f.fileId !== file.fileId);
  }

  uploadAll() {
    this.files.forEach(f => this.upload?.uploadFile(f));
  }

}
