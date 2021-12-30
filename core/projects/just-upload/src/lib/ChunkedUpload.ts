import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ElementRef} from '@angular/core';
import {firstValueFrom, Observable, Subject} from 'rxjs';
import {UploadFileReader} from './UploadFileReader';
import {FileChunk} from './FileChunk';
import {ChunkedUploadConfig, RequestParams, UploadState} from './Models';
import {ChunkedUploadFile} from './ChunkedUploadFile';

/**
 * @author Andreas Hauschild
 * Implementation class that handles a chunked file upload
 */
export class ChunkedUpload {
  /**
   * HTML file input-Element of the upload
   */
  input: ElementRef;

  /**
   * configuration of the chunked upload
   */
  config: ChunkedUploadConfig;

  private chunkProcessedSubject = new Subject<ChunkedUploadFile>();
  private fileAddedSubject = new Subject<ChunkedUploadFile>();

  constructor(private http: HttpClient, input: ElementRef, config: ChunkedUploadConfig) {

    if (!config) {
      throw `Error: Missing config for upload!`
    }
    if (!input) {
      throw `Error: Missing input element for upload!`
    }
    this.config = config;
    this.input = input;
    this.setConfigDefaultValues()
    this.initUpload();
  }

  /**
   * Subscribe to this function to handle chunks after there where send to s server
   */
  public onChunkProcessed(): Observable<ChunkedUploadFile> {
    return this.chunkProcessedSubject;
  }

  public onFiledAdded(): Observable<ChunkedUploadFile> {
    return this.fileAddedSubject;
  }

  private setConfigDefaultValues(): void {

    // If chunk size is not set or <= 1 the whole file will be read as one chunk
    if (!this.config.chunkSize || this.config.chunkSize <= 0) {
      this.config.chunkSize = Number.MAX_SAFE_INTEGER;
    }

    if (!this.config.maxFileSize || this.config.maxFileSize <= 0) {
      this.config.maxFileSize = 1024 * 1024 * 100;
    }

    if (this.config.uploadImmediately === null || this.config.uploadImmediately === undefined) {
      this.config.uploadImmediately = true;
    }
  }


  private initUpload() {
    const input = this.input?.nativeElement as HTMLInputElement;
    if (input) {
      this.input.nativeElement.accept = this.config.accept;
      this.input.nativeElement.multiple = this.config.multi;
      input.onchange = (e => {
        if (input?.files?.length) {
          for (let index = 0; index < input?.files?.length; index++) {
            const uploadFile = new ChunkedUploadFile(input.files[index], this.config.chunkSize);
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

  public uploadFile(file: ChunkedUploadFile): void {

    if (file.state === UploadState.SIZE_LIMIT_EXCEEDED) {
      return;
    }
    let requestError = false;
    const reader = new UploadFileReader(file);
    reader.readChunked(async chunk => {
      if (!requestError) {
        let headers = {'Content-Type': 'application/octet-stream'}
        let params = {query: {}, header: headers} as RequestParams
        chunk.uploadFile = chunk.uploadFile.clone();
        chunk.uploadFile.state = UploadState.UPLOADING;
        chunk.uploadFile.loaded = chunk.chunk.size;

        if (this.config?.beforeChunkSendHook) {
          params = this.config.beforeChunkSendHook({chunk, requestParams: params});
        }
        let response;


        response = await this.doRequest(chunk, params).catch(error => {
          response = error as HttpErrorResponse;
          chunk.uploadFile.state = UploadState.UPLOAD_FAILED;
          requestError = true;
        });

        if (this?.config?.afterChunkSendHook) {
          this.config.afterChunkSendHook({response, chunk, requestParams: params});
        }

        this.chunkProcessedSubject.next(chunk.uploadFile);
      }

    })
  }

  private async doRequest(
    chunk: FileChunk,
    params: RequestParams
  ): Promise<HttpResponse<Object>> {

    let request$: Observable<HttpResponse<Object>>;

    switch (this.config.method) {
      case 'PATCH':
        request$ = this.http.patch(this.config.url, chunk.chunk.data, {params: params.query, headers: params.header, observe: 'response'});
        break;
      case 'POST':
        request$ = this.http.post(this.config.url, chunk.chunk.data, {params: params.query, headers: params.header, observe: 'response'});
        break;
      case 'PUT':
        request$ = this.http.put(this.config.url, chunk.chunk.data, {params: params.query, headers: params.header, observe: 'response'});
        break;
      default:
        throw `Error: Unknown request method '${this.config.method}'`
    }
    return firstValueFrom(request$);
  }

}
