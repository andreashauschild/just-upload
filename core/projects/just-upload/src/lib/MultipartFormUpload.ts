import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {ElementRef} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFile} from './UploadFile';
import {RequestParams, UploadConfig} from './Models';
import {BasicUpload} from './BasicUpload';

export class MultipartFormUpload extends BasicUpload {


  constructor(http: HttpClient, input: ElementRef, config: UploadConfig) {
    super(http, input, config)
  }

  doRequest(uploadFile: UploadFile, params: RequestParams): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData()
    formData.append("file", uploadFile.file, uploadFile.file.name)
    const httpParams = new HttpParams();
    httpParams.appendAll(params.query);
    const req = new HttpRequest<FormData>(
      this.config.method,
      this.config.url,
      formData, {
        headers: new HttpHeaders(params.header),
        params: httpParams,
        reportProgress: true
      });

    return this.http.request(req);
  }


}
