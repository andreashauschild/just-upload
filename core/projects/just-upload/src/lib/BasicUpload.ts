import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {ElementRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UploadFile} from './UploadFile';
import {RequestParams, UploadConfig} from './Models';

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


    let params = {query: {}} as RequestParams

    if (this.config?.beforeFileSendHook) {
      params = this.config.beforeFileSendHook({file: uploadFile, params});
    }

    this.doRequest(uploadFile, params).subscribe(httpEvent => {
      switch (httpEvent.type) {
        case HttpEventType.UploadProgress: {
          const clone = uploadFile.clone();
          clone.loaded = httpEvent.loaded;
          this.fileProcessedSubject.next(clone);
          break;
        }

        case HttpEventType.Response: {
          const clone = uploadFile.clone();
          clone.loaded = uploadFile.file.size;
          clone.finished = true;
          this.fileProcessedSubject.next(clone);
          if (this?.config?.afterFileSendHook) {
            this.config.afterFileSendHook({response: httpEvent, file: clone, params});
          }
          break;
        }

      }
    });


  }

  /**
   * Subscribe to this function to handle chunks after there where send to s server
   */
  public onFileProcessed(): Observable<UploadFile> {
    return this.fileProcessedSubject;
  }

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
