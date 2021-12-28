import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {ElementRef} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFile} from './UploadFile';
import {RequestParams, UploadConfig} from './Models';
import {BasicUpload} from './BasicUpload';

/**
 * Implementation class of a upload. In general it  is a chunked upload with exactly one chunk.
 */
export class Upload extends BasicUpload {


  constructor(http: HttpClient, input: ElementRef, config: UploadConfig) {
    super(http, input, config)
  }

  doRequest(uploadFile: UploadFile, params: RequestParams): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData()
    formData.append("file", uploadFile.file, uploadFile.file.name)
    let httpParams = new HttpParams().appendAll(params.query);

    const req = new HttpRequest<File>(
      this.config.method,
      this.config.url,
      uploadFile.file, {
        headers: new HttpHeaders(params.header),
        params: httpParams,
        reportProgress: true
      });
    return this.http.request(req);
  }


}
