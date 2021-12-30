import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {ElementRef} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFile} from './UploadFile';
import {RequestParams, UploadConfig} from './Models';
import {BasicUpload} from './BasicUpload';

/**
 * @author Andreas Hauschild
 * Implementation class that handles a file upload
 */
export class Upload extends BasicUpload {


  constructor(http: HttpClient, input: ElementRef, config: UploadConfig) {
    super(http, input, config)
  }

  doRequest(uploadFile: UploadFile, params: RequestParams): Observable<HttpEvent<any>> {
    let queryParams = new HttpParams().appendAll(params.query);
    let headers = new HttpHeaders(params.header);

    const req = new HttpRequest<File>(
      this.config.method,
      this.config.url,
      uploadFile.file, {
        headers: headers,
        params: queryParams,
        reportProgress: true
      });
    return this.http.request(req);
  }

  getDefaultRequestParams(): RequestParams {
    return {query: {}, header: {'Content-Type': 'application/octet-stream'}};
  }

}
