# just-upload

Just Upload is an `angular` library **(without external dependencies)** that provides all necessary features to make file upload simple as possible. The goal of the library is to
provide `services` , `models` and `examples` to implement your own custom upload components.

**Requires:** *Angular 13+*

![system schema](https://github.com/andreashauschild/just-upload/blob/main/assets/just-upload-example.gif?raw=true)

### Features

- Includes Hooks to `enrich/customize` request data like `query parameters` and `headers` (e.g. access tokens)
- Supports different upload types:
  - `Basic Upload` - send file as `application/octet-stream` 
    - [see Basic Upload Example](https://github.com/andreashauschild/just-upload/blob/main/core/projects/example-app/src/app/examples/basic-upload-example/basic-upload-example.component.ts)
    - [Quarkus Endpoint (BasicUploadResource.java)](https://github.com/andreashauschild/just-upload/blob/main/dev/servers/quarkus/src/main/java/de/litexo/BasicUploadResource.java)
  - `Basic Upload Multipart` - uploads files as `multipart/form-data`
    - [see Basic Multipart Example](https://github.com/andreashauschild/just-upload/blob/main/core/projects/example-app/src/app/examples/basic-multipart-example/basic-multipart-example.component.ts)
    - [Quarkus Endpoint (BasicUploadResource.java)](https://github.com/andreashauschild/just-upload/blob/main/dev/servers/quarkus/src/main/java/de/litexo/BasicUploadResource.java)
  - `Chunked Upload` - Splits a file in chunks and sends for each chunk a http request. This can be used to upload very large files which may exceeding the size of a single
    request. 
    - [see Basic Chunked Upload Example](https://github.com/andreashauschild/just-upload/blob/main/core/projects/example-app/src/app/examples/basic-chunked-upload-example/basic-chunked-upload-example.component.ts)
    - [Quarkus Endpoint (ChunkUploadResource.java)](https://github.com/andreashauschild/just-upload/blob/main/dev/servers/quarkus/src/main/java/de/litexo/ChunkUploadResource.java)
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

```typescript
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

```typescript
constructor(private service: JustUploadService)
```

## Concepts - Basic Upload
The `JustUploadService` helps you to create an `upload object` which provides all necessary functions to implement your upload.
To create an `upload` you need to provide a reference to a `HTML file input element` and a `configuration`.

After the creation of the `upload object` you can listen to changes if you subscribe to `onFileProcessed` and `onFiledAdded`.

The most simple upload looks like this (The code can be found here: [example1](https://github.com/andreashauschild/just-upload/blob/main/core/projects/example-app/src/app/examples/documentation1/documentation1.component.ts)):

Info the backend of the upload server is implemented in java with quarkus. You can find the REST-Endpoint here: [BasicUploadResource.java](https://github.com/andreashauschild/just-upload/blob/main/dev/servers/quarkus/src/main/java/de/litexo/BasicUploadResource.java)
```typescript
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

  // Use ngAfterViewInit because in the lifecycle step the 'upload' is set
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

## UploadConfig - UploadFile - Upload

### UploadConfig
The `UploadConfig` allows the following configurations:

| Attribute   |      Description      |
|----------|---------------|
| `url` |  http endpoint of the upload |
| `uploadImmediately` |    if true files will immediately be uploaded after there added to the upload **default: false**   |
| `method` | http request method that should be used (`POST`, `PUT`, `PATCH`) |
| `maxFileSize` | maximal size of a file that can be added **default: 100MB** |
| `multi` |   `false` = single file upload; `true` = multi file upload |
| `accept` |  accept value of the input field e.g. `*`, `png jpeg jpg`, see: [input accept](https://www.w3schools.com/tags/att_input_accept.asp)  |
| `beforeFileSendHook?(before: BeforeFileSend): RequestParams;` | `callback function` that executes before the file is send. this is used to add custom `header` or `query parameters` to the request. These custom parameters must be returned as result of the callback function |
| `afterFileSendHook?(after: AfterFileSend): void;` | `callback function` that executes after the file is send |

### UploadFile
The `UploadFile` is the file data model. It holds the browser file an additional information:

| Attribute   |      Description      |
|----------|---------------|
| `file` | reference to the original file object  |
| `name` | name of the file |
| `extension` |  extension of the file e.g.: `png`, `jpg`  |
| `size` |  `size` in `bytes` of the file  |
| `sizeHumanReadable` | size of file as human readable string like: `100kb`, `2MB`, `1GB`  |
| `mimeType` | MimeType of the file [see MimeTypes.ts](https://github.com/andreashauschild/just-upload/blob/main/core/projects/just-upload/src/lib/MimeTypes.ts)  |
| `fileId` | id of the file that is uploaded. This is generated: <size>_<name>_<timestamp> like 128_thumbnail.png_1640697283494  |
| `state` |  current upload state of the file [see UploadState](https://github.com/andreashauschild/just-upload/blob/70fe1ffd6a8d06e88e365aff78487e914c5d7c9c/core/projects/just-upload/src/lib/Models.ts#L11-L36) |
| `loadedHumanReadable` | current value of uploaded data as human readable string  |
| `loadedPercent` | totally transferred of file in percent |
| `httpResponse` |  stores the `httpResponse` of the upload. can be used for specialized response handling. can be `HttpResponse`, `HttpErrorResponse` or `undefined` if the file was not send yet  |

### Upload
The `Upload` will be created by a factory method of the `JustUploadService`. It is the main object you will work with.

| Methods   |      Description      |
|----------|---------------|
| `uploadFile(uploadFile: UploadFile): void` | Method to trigger the upload process of the given file. The method can be used if `uploadImmediately` is disabled  |
| `onFileProcessed(): Observable<UploadFile>` | Subscribe for receiving progress chances while the file is processed. Returns`UploadFile` with the current state. **Info:** If you are uploading files with a very good connection (e.g. local server) you may get only one processing update   |
| `onFiledAdded(): Observable<UploadFile>` | Subscribe for receiving the files that are added to the `input` element  |
