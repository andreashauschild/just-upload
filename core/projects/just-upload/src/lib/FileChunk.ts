import {formatBytesToHumanReadable} from './Helpers';
import {ChunkedUploadFile} from './ChunkedUploadFile';

/**
 * Type tha represents the data of a chunk
 */
export type Chunk = {
  data: any
  index: number
  size: number
  offset: number
}

/**
 * Data object for a chunk of the uploaded file
 */
export class FileChunk {
  public uploadFile: ChunkedUploadFile;

  public chunk: Chunk;
  public loadedPercent: number = 0;
  public loadedHumanReadable: string;
  public finished = false;

  constructor(uploadFile: ChunkedUploadFile, chunk: Chunk) {
    this.uploadFile = uploadFile;
    this.chunk = chunk;
    this.loadedPercent = Math.ceil((100 * chunk.index) / this.uploadFile.totalChunks);
    this.loadedHumanReadable = formatBytesToHumanReadable((chunk.index / this.uploadFile.totalChunks) * uploadFile.file.size);
    this.finished = chunk.index === this.uploadFile.totalChunks;
    this.uploadFile.currentChunk = this;
  }

}
