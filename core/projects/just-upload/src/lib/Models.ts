import {FileChunk} from './FileChunk';
import {HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {UploadFile} from './UploadFile';

export interface BaseUploadConfig {
  // http endpoint of the upload
  url: string;

  // if true files will immediately be uploaded after there added to the upload
  uploadImmediately?: boolean,

  // http request method that should be used
  method: 'POST' | 'PUT' | 'PATCH'

  // maximal size of a file that can be added
  maxFileSize?: number;

  // false = single file upload; true = multi file upload
  multi?: boolean;

  // accept value of the input field e.g. 'image/png'
  accept?: string;

}

export type RequestParams = {
  query: {[name: string]: string},
  header:{[name: string]: string}
}

export interface UploadConfig extends BaseUploadConfig {

  // hook to intercept and set parameters (e.g. header and query params) before the chunk is send to server
  beforeFileSendHook?(before: BeforeFileSend): RequestParams;

  // hook to intercept if the chunk was send and the server response was received
  afterFileSendHook?(after: AfterFileSend): void;
}

/**
 * Config of a chunked upload
 */
export interface ChunkedUploadConfig extends BaseUploadConfig {

  // size of a chunk in bytes
  chunkSize: number;

  // hook to intercept and set parameters (e.g. header and query params) before the chunk is send to server
  beforeChunkSendHook?(before: BeforeChunkSend): RequestParams;

  // hook to intercept if the chunk was send and the server response was received
  afterChunkSendHook?(after: AfterChunkSend): void;

}

export interface BeforeFileSend {
  file: UploadFile,
  params: RequestParams;
}

export interface AfterFileSend {
  response: HttpResponse<Object> | null,
  file: UploadFile,
  params: RequestParams;
}


export interface BeforeChunkSend {
  chunk: FileChunk,
  requestParams: RequestParams;
}

export interface AfterChunkSend {
  response: HttpResponse<Object>,
  chunk: FileChunk,
  requestParams: RequestParams;
}

export type QueryParams =
  HttpParams
  | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; }
export type HeadersParams = HttpHeaders | {
  [header: string]: string | string[];
};
