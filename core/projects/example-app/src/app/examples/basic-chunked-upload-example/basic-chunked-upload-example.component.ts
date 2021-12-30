import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {
  formatBytesToHumanReadable,
  ChunkedUploadConfig,
  AfterChunkSend,
  BeforeChunkSend,
  ChunkedUpload,
  ChunkedUploadFile,
  JustUploadService,
  RequestParams,
  updateFileList,
  UploadState
} from 'just-upload';


@Component({
  selector: 'app-basic-chunked-upload-example',
  template: `
    <h1>Basic Chunked Upload</h1>
    <input #fileUpload type="file">
    <p>Limit: {{limitHumanReadable}}</p>
    <input (click)="uploadAll()" value="Upload All" type="button">
    <table style="border: solid 1px;width: 800px; ">
      <tr>
        <th>File</th>
        <th style="width: 50px">Progress</th>
        <th style="width: 250px">Data Send</th>
        <th style="width: 150px">%</th>
        <th style="width: 150px">Status</th>
        <th>Upload</th>
        <th>Remove</th>
      </tr>
      <tr *ngFor="let file of files ">
        <td> {{file.name}}</td>
        <td *ngIf="file.currentChunk"> {{file.currentChunk.chunk.index}}/{{file.totalChunks}}</td>
        <td> {{file.currentChunk.loadedHumanReadable}} / {{file.sizeHumanReadable}}</td>
        <td> {{file.currentChunk.loadedPercent}}</td>
        <td>
          {{file.state}}
        </td>
        <td><input *ngIf="file.state!==STATES.SIZE_LIMIT_EXCEEDED" (click)="chunkedUpload?.uploadFile(file)" value="upload" type="button"></td>
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
export class BasicChunkedUploadExampleComponent implements AfterViewInit {

  @ViewChild("fileUpload", {static: false})
  fileUpload: ElementRef | undefined;

  files: ChunkedUploadFile[] = []

  STATES = UploadState;

  limitHumanReadable: string | undefined;

  chunkedUpload?: ChunkedUpload;

  config: ChunkedUploadConfig;

  constructor(private uploadService: JustUploadService) {
    this.config = {
      url: "http://localhost:8080/api/chunk-upload",
      method: "POST",
      multi: true,
      uploadImmediately: false,
      maxFileSize: 100 * 1024, // 100kb
      chunkSize: 1024 * 2,

      beforeChunkSendHook(before: BeforeChunkSend) {
        const chunk = {...before.chunk}

        // Add query parameter to the post request
        const params: RequestParams = {
          query: {
            fileId: chunk.uploadFile.fileId,
            offset: chunk.chunk.offset.toString(),
            fileSize: chunk.uploadFile.size.toString(),
            fileName: chunk.uploadFile.name
          },
          // Add header to the post request, e.g. for Authorization
          header: {...before.requestParams.header, 'Authorization': 'Basic d2lraTpwZWRpYQ== '}
        }


        return params;
      },
      afterChunkSendHook(after: AfterChunkSend) {
        if (after?.response?.status == 201) {
          // set finished if server response with 201
          after.chunk.uploadFile.state = UploadState.UPLOAD_SUCCESS;
        }
      }
    };
    this.limitHumanReadable = formatBytesToHumanReadable(this.config.maxFileSize!);
  }

  ngAfterViewInit(): void {
    this.chunkedUpload = this.uploadService.createChunkedUpload(this.fileUpload!, this.config);
    this.chunkedUpload.onChunkProcessed().subscribe(updatedFile => {
      console.log("onChunk", updatedFile);

      this.files = updateFileList(this.files, updatedFile);
    });

    this.chunkedUpload.onFiledAdded().subscribe(fi => {
      this.files.push(fi);
    });
  }

  remove(file: ChunkedUploadFile) {
    this.files = this.files.filter(f => f.fileId !== file.fileId);
  }

  uploadAll() {
    this.files.forEach(f => this.chunkedUpload?.uploadFile(f));
  }
}
