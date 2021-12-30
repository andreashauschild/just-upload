import {BaseFile} from './BaseFile';

/**
 * Format the given number of bytes to a human readable format
 * @param bytes number of bytes
 * @param decimals number of decimals to use
 */
export function formatBytesToHumanReadable(bytes: number, decimals = 2): string {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Support function to update (replace, add) a file in a list of file. This function returns a new array.
 * @param fileList
 *   list o files to update
 * @param updateFile
 *    file to update or add
 */
export function updateFileList<T extends BaseFile>(fileList: T[], updateFile: T): T[] {
  return fileList.map(file => {
    if (file.fileId === updateFile.fileId) {
      return updateFile;
    } else {
      return file;
    }
  })

}
