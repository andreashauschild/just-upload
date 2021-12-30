import {ElementRef, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChunkedUpload} from './ChunkedUpload';
import {ChunkedUploadConfig, UploadConfig} from './Models';
import {Upload} from './Upload';
import {MultipartFormUpload} from './MultipartFormUpload';


/**
 * Core Service that creates different types of file uploads
 */
@Injectable({
  providedIn: 'root'
})
export class JustUploadService {

  constructor(private http: HttpClient) {
  }

  /**
   * Create a ChunkedUpload object for handling chunked uploads
   * @param input
   *    html input element '<input type="file">'
   * @param config
   *    config of the upload
   */
  public createChunkedUpload(input: ElementRef, config: ChunkedUploadConfig): ChunkedUpload {
    return new ChunkedUpload(this.http, input, config);
  }

  /**
   * Create a ChunkedUpload object for handling chunked uploads
   * @param input
   *    html input element '<input type="file">'
   * @param config
   *    config of the upload
   */
  public createUpload(input: ElementRef, config: UploadConfig): Upload {
    return new Upload(this.http, input, config);
  }

  /**
   * Creates an upload that sends the file as multipart request
   * @param input html input field
   * @param config configuration
   */
  public createMultipartFormUpload(input: ElementRef, config: UploadConfig): MultipartFormUpload {
    return new MultipartFormUpload(this.http, input, config);
  }
}
