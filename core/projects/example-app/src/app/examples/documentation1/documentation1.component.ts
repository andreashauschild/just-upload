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
