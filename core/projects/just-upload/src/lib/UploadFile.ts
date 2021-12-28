import {BaseFile} from './BaseFile';


export class UploadFile extends BaseFile {

  public data: any;


  constructor(file: File) {
    super(file);
  }

  override clone(): UploadFile {
    const clone = super.clone() as UploadFile;
    clone.data = this.data;
    return clone;
  }


}
