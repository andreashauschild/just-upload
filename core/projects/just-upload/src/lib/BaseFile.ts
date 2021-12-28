import {MimeType, resolveMimeType} from './MimeTypes';
import {formatBytesToHumanReadable} from './Helpers';


export class BaseFile {
  public file!: File;
  public name!: string;
  public extension: string | undefined;
  public size!: number;
  public sizeHumanReadable!: string;
  public mimeType!: MimeType;
  public fileId: string;
  public finished = false;
  public loadedHumanReadable!: string;
  public loadedPercent: number = 0;


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

  public set loaded(value: number) {
    this._loaded = value;
    this.loadedPercent = Math.round(100 * (this.loaded / this.file.size));
    this.loadedHumanReadable = formatBytesToHumanReadable(this.loaded);
  }

  public get loaded(): number {
    return this._loaded;
  }


  public clone(): BaseFile {
    const id = this.fileId;
    const loaded = this.loaded;
    const clone = new BaseFile(this.file);
    clone.fileId = id;
    clone.loaded = loaded;
    return clone;
  }

}
