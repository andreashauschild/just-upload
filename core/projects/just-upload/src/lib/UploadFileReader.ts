import {FileChunk} from './FileChunk';
import {ChunkedUploadFile} from './ChunkedUploadFile';


export class UploadFileReader {


  constructor(private uploadFile: ChunkedUploadFile) {
  }

  public readChunked(onChunk: (file: FileChunk) => void): void {

    let maxChunkSize = this.uploadFile.maxChunkSize;
    let offset = 0;
    let chunkReaderBlock: any = null;
    let chunkCount = 1
    var readEventHandler = async (evt: ProgressEvent<FileReader>) => {
      if (evt?.target?.error == null) {
        let filInfo: FileChunk = new FileChunk(this.uploadFile, {
          data: evt?.target?.result,
          index: chunkCount++,
          offset,
          size: evt?.loaded
        })
        await onChunk(filInfo);
        offset += evt?.loaded;
      } else {
        return;
      }

      if (offset >= this.uploadFile.file.size) {
        return;
      }

      // of to the next chunk
      chunkReaderBlock(offset, maxChunkSize, this.uploadFile.file);
    }

    chunkReaderBlock = (_offset: any, chunkSize: any, _file: any) => {
      var r = new FileReader();
      var blob = _file.slice(_offset, chunkSize + _offset);
      r.onload = readEventHandler;
      r.readAsArrayBuffer(blob);
    }

    // now let's start the read with the first block
    chunkReaderBlock(offset, maxChunkSize, this.uploadFile.file);
  }
}
