import {formatBytesToHumanReadable} from './Helpers';
import {FileChunk} from "./FileChunk";
import {BaseFile} from './BaseFile';


export class ChunkedUploadFile extends BaseFile {

  public totalChunks: number;
  public maxChunkSize: number;
  public currentChunk: FileChunk;


  constructor(file: File, maxChunkSize?: number) {
    super(file);

    if (maxChunkSize) {
      this.maxChunkSize = maxChunkSize;
      this.totalChunks = Math.ceil(file.size / maxChunkSize);
    } else {
      this.maxChunkSize = file.size;
      this.totalChunks = 1;
    }

    this.currentChunk = {
      chunk: {data: [], size: 0, offset: 0, index: 0},
      uploadFile: this,
      finished: false,
      loadedHumanReadable: formatBytesToHumanReadable(0),
      loadedPercent: 0
    }

  }

  get data(): any {
    return this.currentChunk.chunk.data;
  }

  override clone(): ChunkedUploadFile {

    const clone = super.clone() as ChunkedUploadFile;
    clone.currentChunk = this.currentChunk;
    clone.currentChunk.uploadFile = clone;
    return clone;

  }

}
