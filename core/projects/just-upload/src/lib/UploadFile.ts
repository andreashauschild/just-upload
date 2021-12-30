import {BaseFile} from './BaseFile';

/**
 * @author Andreas Hauschild
 * Data class the represents a file is uploaded
 */
export class UploadFile extends BaseFile {

  constructor(file: File) {
    super(file);
  }

  clone(): UploadFile {
    const id = this.fileId;
    const loaded = this.loaded;
    const clone = new UploadFile(this.file);
    clone.fileId = id;
    clone.loaded = loaded;
    return clone;
  }
}
