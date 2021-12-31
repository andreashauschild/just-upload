# just-upload

Just Upload is an `angular` library **(without external dependencies)** that provides all necessary features to make file upload simple as possible. The goal of the library is to
provide `services` , `models` and `examples` to implement your own custom upload components.

**Requires:** *Angular 13+*

![system schema](https://github.com/andreashauschild/just-upload/blob/main/assets/just-upload-example.gif?raw=true)

### Features

- Includes Hooks to `enrich/customize` request data like `query parameters` and `headers` (e.g. access tokens)
- Supports different upload types:
  - `Basic Upload` - send file as `application/octet-stream`
  - `Basic Upload Multipart` - uploads files as `multipart/form-data`
  - `Chunked Upload` - Splits a file in chunks and sends for each chunk a http request. This can be used to upload very large files which may exceeding the size of a single
    request.
- Provides a lot of useful information out of the box
  - State update via Observables while uploading
  - State of upload in percent
  - Size of file in a human-readable format (KB, MB, GB)
  - MimeType recognition
  - Example of data model:
  - ![system schema](https://github.com/andreashauschild/just-upload/blob/main/assets/upload-file-model.png?raw=true)



# Installation
```
npm install @andreashauschild/just-upload
```
# Usage
To use this library you need to import the JustUploadModule into your application. Then you can import the

## Import the JustUploadModule

To use this library you need to import it in your angular `app.module.ts`

```
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    JustUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Inject the Service in your Component

```
constructor(private service: JustUploadService)
```

## Concepts - Basic Upload and Basic Upload Multipart
The `JustUploadService` helps you to create an `upload object` which provides all necessary functions to implement your upload.
To create an `upload` you need to provide a reference to a `HTML file input element` and a `configuration`.

After the creation of the `upload object` you can listen to changes if you subscribe to `onFileProcessed` and `onFiledAdded`.

The most simple upload looks like this:

```
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {JustUploadService, Upload, UploadConfig} from 'just-upload';

@Component({
  selector: 'app-documentation1',
  template: `
    <!-- HTML File Input with template variables as reference    -->
    <input #fileUpload type="file">
  `,
  styles: [``]
})
export class Documentation1Component implements AfterViewInit {

  // Element reference of the file input field. Be aware that this ref will be accessible in AfterViewInit
  @ViewChild("fileUpload", {static: false})
  fileUpload: ElementRef | undefined;

  // The config for the upload
  config: UploadConfig;

  // The upload object which controls everything
  upload?: Upload;

  constructor(private service: JustUploadService) {
    // initialize basic config this will send the file immediately to the given endpoint with a post request
    this.config = {
      url: "http://localhost:8080/api/basic-upload/single-binary",
      method: "POST"
    }
  }

  // Use ngAfterViewInit because in the lifecycle step the 'fileUpload' is set
  ngAfterViewInit(): void {

    // Setup the upload
    this.upload = this.service.createUpload(this.fileUpload!, this.config);

    // Log the processing stages of the file
    this.upload.onFileProcessed().subscribe(procced => {
      console.log("File Processed", procced);
    });

    // Log if a file was added to the upload
    this.upload.onFiledAdded().subscribe(added => {
      console.log("File Added", added);
    });
  }

}
```
https://github.com/andreashauschild/just-upload/blob/af05daf922213204b8fe10cc841b64b43e809427/core/angular.json#L16-L21
