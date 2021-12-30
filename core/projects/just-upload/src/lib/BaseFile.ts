import {MimeType, resolveMimeType} from './MimeTypes';
import {formatBytesToHumanReadable} from './Helpers';
import {UploadState} from './Models';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

/**
 * @author Andreas Hauschild
 * Represents all basic information of a file
 */
export abstract class BaseFile {

  /***
   * reference to the original file object
   */
  public file!: File;

  /***
   * name of the file
   */
  public name!: string;

  /**
   * extension of the file e.g.: png, jpg
   */
  public extension: string | undefined;

  /**
   * size in bytes of the file
   */
  public size!: number;

  /**
   * size of file as human readable string like: 100kb, 2MB, 1gb
   */
  public sizeHumanReadable!: string;

  /**
   * Mimetype of th file
   */
  public mimeType!: MimeType;

  /**
   * id of the file that is uploaded. This is generated: <size>_<name>_<timestamp> like 128_thumbnail.png_1640697283494
   */
  public fileId: string;

  /**
   * Current upload state of the file
   */
  public state: UploadState = UploadState.READY;

  /**
   * current value of uploaded data as human readable string
   */
  public loadedHumanReadable!: string;

  /**
   * totally transferred of file in percent
   */
  public loadedPercent: number = 0;

  /**
   * stores the httpResponse of the upload. can be used for specialized response handling
   */
  public httpResponse: HttpErrorResponse | HttpResponse<any> | undefined;


  /**
   * loaded data in bytes
   * @private
   */
  private _loaded: number = 0;

  constructor(file: File) {
    this.file = file;
    this.name = file.name;
    this.extension = file.name.indexOf('.') > 0 ? file.name.split(/[.]+/).pop() : undefined;
    this.size = file.size;
    this.mimeType = resolveMimeType(file);
    this.fileId = this.fileId = file.size + '_' + file.name + '_' + new Date().getTime();
    this.sizeHumanReadable = formatBytesToHumanReadable(this.file.size);
    this.loaded = 0;

  }

  /**
   * Sets the value of the current loaded bytes
   * @param value
   */
  public set loaded(value: number) {
    this._loaded = value;
    this.loadedPercent = Math.round(100 * (this.loaded / this.file.size));
    this.loadedHumanReadable = formatBytesToHumanReadable(this.loaded);
  }

  public get loaded(): number {
    return this._loaded;
  }


  public abstract clone(): any;

}
