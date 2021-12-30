import {formatBytesToHumanReadable} from './Helpers';
import {FileChunk} from "./FileChunk";
import {BaseFile} from './BaseFile';

/**
 * @author Andreas Hauschild
 * File that represents a chunked file upload
 */
export class ChunkedUploadFile extends BaseFile {

  /**
   * Total number of chunks that will be read, based on the file size and maximum chunk size
   */
  public totalChunks: number;

  /**
   * Maximum size of a chunk
   */
  public maxChunkSize: number;

  /**
   * Provides the current chunk that will be send
   */
  public currentChunk: FileChunk;


  /**
   * Creates a chunk upload file
   * @param file that is uploaded
   * @param maxChunkSize maximum size of chunk
   */
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

  /**
   * Returns the data of the current chunk.
   */
  get data(): any {
    return this.currentChunk.chunk.data;
  }

  clone(): ChunkedUploadFile {

    const id = this.fileId;
    const loaded = this.loaded;
    const clone = new ChunkedUploadFile(this.file,this.maxChunkSize);
    clone.currentChunk = {...this.currentChunk};
    clone.currentChunk.uploadFile = clone;
    clone.fileId = id;
    clone.loaded = loaded;
    return clone;

  }

}
