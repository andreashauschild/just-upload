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
  - state of upload in percent
  - size of file in a human-readable format (KB, MB, GB)
  - MimeType recognition
  - Example of datamodel:
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

## Concepts
The JustUploadService helps you to create an upload object which provides all necessary functions to implement your upload.
To create an upload you need to provide a reference to a HTML file input element and a configuration.
