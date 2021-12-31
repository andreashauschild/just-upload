import {FileChunk} from './FileChunk';
import {HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {UploadFile} from './UploadFile';

/**
 * @author Andreas Hauschild
 * This file contains the basic models used by this library
 */


export enum UploadState {
  /**
   * File is ready to be uploaded
   */
  READY = "READY",

  /**
   * File exceeds file limit, upload will be disabled
   */
  SIZE_LIMIT_EXCEEDED = "SIZE_LIMIT_EXCEEDED",

  /**
   * File is uploading
   */
  UPLOADING = "UPLOADING",

  /**
   * Upload of file failed
   */
  UPLOAD_FAILED = "UPLOAD_FAILED",

  /**
   * Upload of file was successful
   */
  UPLOAD_SUCCESS = "UPLOAD_SUCCESS",
}

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
  query: { [name: string]: string },
  header: { [name: string]: string }
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
  response: HttpResponse<any> | HttpErrorResponse| undefined,
  file: UploadFile,
  params: RequestParams;
}


export interface BeforeChunkSend {
  chunk: FileChunk,
  requestParams: RequestParams;
}

export interface AfterChunkSend {
  response: HttpResponse<any> | HttpErrorResponse| undefined | void,
  chunk: FileChunk,
  requestParams: RequestParams;
}

export type QueryParams =
  HttpParams
  | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; }
export type HeadersParams = HttpHeaders | {
  [header: string]: string | string[];
};
