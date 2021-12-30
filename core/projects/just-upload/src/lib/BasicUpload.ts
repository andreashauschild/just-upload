import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {ElementRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UploadFile} from './UploadFile';
import {RequestParams, UploadConfig, UploadState} from './Models';

/**
 * @author Andreas Hauschild
 * Represents all basic information of a file
 */
export abstract class BasicUpload {
  input: ElementRef;
  config: UploadConfig;

  private fileProcessedSubject = new Subject<UploadFile>();
  private fileAddedSubject = new Subject<UploadFile>();

  constructor(protected http: HttpClient, input: ElementRef, config: UploadConfig) {

    if (!config) {
      throw `Error: Missing config for upload!`
    }
    if (!input) {
      throw `Error: Missing input element for upload!`
    }


    this.config = config;
    this.input = input;
    this.setConfigDefaultValues();
    this.initUpload();
  }

  public uploadFile(uploadFile: UploadFile) {
    if (uploadFile.state === UploadState.SIZE_LIMIT_EXCEEDED) {
      return;
    }

    let params = this.getDefaultRequestParams();

    if (this.config?.beforeFileSendHook) {
      params = this.config.beforeFileSendHook({file: uploadFile, params});
    }

    this.doRequest(uploadFile, params).subscribe({
      next: (httpEvent) => {
        switch (httpEvent.type) {
          case HttpEventType.Sent: {
            const clone = uploadFile.clone();
            clone.state = UploadState.UPLOADING;
            this.fileProcessedSubject.next(clone);
            break;
          }

          case HttpEventType.UploadProgress: {
            const clone = uploadFile.clone();
            clone.loaded = httpEvent.loaded;
            this.fileProcessedSubject.next(clone);
            break;
          }

          case HttpEventType.Response: {
            this.handelResponse(params, uploadFile, httpEvent);
            break;
          }


        }
      }, error: error => {
        this.handelResponse(params, uploadFile, error);
      }
    });


  }

  private handelResponse(params: RequestParams, uploadFile: UploadFile, resp: HttpResponse<any> | HttpErrorResponse) {
    const clone = uploadFile.clone();
    clone.httpResponse = resp;
    if (resp.ok) {
      clone.state = UploadState.UPLOAD_SUCCESS;
      clone.loaded = uploadFile.file.size;
    } else {
      clone.state = UploadState.UPLOAD_FAILED;
    }

    this.fileProcessedSubject.next(clone);
    if (this?.config?.afterFileSendHook) {
      this.config.afterFileSendHook({response: resp, file: clone, params});
    }
  }

  /**
   * Emits an observable if the file was processed (upload finished, server response)
   */
  public onFileProcessed(): Observable<UploadFile> {
    return this.fileProcessedSubject;
  }

  /**
   * Emits an observable a file was added to the upload input field
   */
  public onFiledAdded(): Observable<UploadFile> {
    return this.fileAddedSubject;
  }

  private setConfigDefaultValues(): void {

    if (!this.config.maxFileSize || this.config.maxFileSize <= 0) {
      this.config.maxFileSize = 1024 * 1024 * 100;
    }

    if (this.config.uploadImmediately === null || this.config.uploadImmediately === undefined) {
      this.config.uploadImmediately = true;
    }
  }

  abstract getDefaultRequestParams(): RequestParams;

  abstract doRequest(uploadFile: UploadFile, params: RequestParams): Observable<HttpEvent<any>>;

  private initUpload() {
    const input = this.input?.nativeElement as HTMLInputElement;
    if (input) {
      this.input.nativeElement.accept = this.config.accept;
      this.input.nativeElement.multiple = this.config.multi;
      input.onchange = (e => {
        if (input?.files?.length) {
          for (let index = 0; index < input?.files?.length; index++) {
            const uploadFile = new UploadFile(input.files[index]);
            if (uploadFile.size > this.config.maxFileSize!) {
              uploadFile.state = UploadState.SIZE_LIMIT_EXCEEDED;
            }
            this.fileAddedSubject.next(uploadFile);
            if (this.config.uploadImmediately) {
              this.uploadFile(uploadFile);
            }
          }
        }
      });
    }
  }
}
