export type MimeType = {
  extension: 'aac'
    | 'abw'
    | 'arc'
    | 'avi'
    | 'azw'
    | 'bin'
    | 'bmp'
    | 'bz'
    | 'bz2'
    | 'cda'
    | 'csh'
    | 'css'
    | 'csv'
    | 'doc'
    | 'docx'
    | 'eot'
    | 'epub'
    | 'gz'
    | 'gif'
    | 'htm'
    | 'html'
    | 'ico'
    | 'ics'
    | 'jar'
    | 'jpeg'
    | 'jpg'
    | 'js'
    | 'json'
    | 'jsonld'
    | 'mid'
    | 'midi'
    | 'mjs'
    | 'mp3'
    | 'mp4'
    | 'mpeg'
    | 'mpkg'
    | 'odp'
    | 'ods'
    | 'odt'
    | 'oga'
    | 'ogv'
    | 'ogx'
    | 'opus'
    | 'otf'
    | 'png'
    | 'pdf'
    | 'php'
    | 'ppt'
    | 'pptx'
    | 'rar'
    | 'rtf'
    | 'sh'
    | 'svg'
    | 'swf'
    | 'tar'
    | 'tif'
    | 'tiff'
    | 'ts'
    | 'ttf'
    | 'txt'
    | 'vsd'
    | 'wav'
    | 'weba'
    | 'webm'
    | 'webp'
    | 'woff'
    | 'woff2'
    | 'xhtml'
    | 'xls'
    | 'xlsx'
    | 'xml'
    | 'xul'
    | 'zip'
    | '3gp'
    | '3g2'
    | '7z'
    | 'unknown';
  description: string;
  MIMEType: string
}
// source:https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const mimeTypes: any = [];
mimeTypes.push(["aac", "AAC audio", "audio/aac"]);
mimeTypes.push(["abw", "AbiWord document", "application/x-abiword"]);
mimeTypes.push(["arc", "Archive document (multiple files embedded)", "application/x-freearc"]);
mimeTypes.push(["avi", "AVI: Audio Video Interleave", "video/x-msvideo"]);
mimeTypes.push(["azw", "Amazon Kindle eBook format", "application/vnd.amazon.ebook"]);
mimeTypes.push(["bin", "Any kind of binary data", "application/octet-stream"]);
mimeTypes.push(["bmp", "Windows OS/2 Bitmap Graphics", "image/bmp"]);
mimeTypes.push(["bz", "BZip archive", "application/x-bzip"]);
mimeTypes.push(["bz2", "BZip2 archive", "application/x-bzip2"]);
mimeTypes.push(["cda", "CD audio", "application/x-cdf"]);
mimeTypes.push(["csh", "C-Shell script", "application/x-csh"]);
mimeTypes.push(["css", "Cascading Style Sheets (CSS)", "text/css"]);
mimeTypes.push(["csv", "Comma-separated values (CSV)", "text/csv"]);
mimeTypes.push(["doc", "Microsoft Word", "application/msword"]);
mimeTypes.push(["docx", "Microsoft Word (OpenXML)", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
mimeTypes.push(["eot", "MS Embedded OpenType fonts", "application/vnd.ms-fontobject"]);
mimeTypes.push(["epub", "Electronic publication (EPUB)", "application/epub+zip"]);
mimeTypes.push(["gz", "GZip Compressed Archive", "application/gzip"]);
mimeTypes.push(["gif", "Graphics Interchange Format (GIF)", "image/gif"]);
mimeTypes.push(["htm", "HyperText Markup Language (HTML)", "text/html"]);
mimeTypes.push(["html", "HyperText Markup Language (HTML)", "text/html"]);
mimeTypes.push(["ico", "Icon format", "image/vnd.microsoft.icon"]);
mimeTypes.push(["ics", "iCalendar format", "text/calendar"]);
mimeTypes.push(["jar", "Java Archive (JAR)", "application/java-archive"]);
mimeTypes.push(["jpeg", "JPEG images", "image/jpeg"]);
mimeTypes.push(["jpg", "JPEG images", "image/jpeg"]);
mimeTypes.push(["js", "JavaScript", "text/javascript"]);
mimeTypes.push(["json", "JSON format", "application/json"]);
mimeTypes.push(["jsonld", "JSON-LD format", "application/ld+json"]);
mimeTypes.push(["mid", "Musical Instrument Digital Interface (MIDI)", "audio/midi audio/x-midi"]);
mimeTypes.push(["midi", "Musical Instrument Digital Interface (MIDI)", "audio/midi audio/x-midi"]);
mimeTypes.push(["mjs", "JavaScript module", "text/javascript"]);
mimeTypes.push(["mp3", "MP3 audio", "audio/mpeg"]);
mimeTypes.push(["mp4", "MP4 video", "video/mp4"]);
mimeTypes.push(["mpeg", "MPEG Video", "video/mpeg"]);
mimeTypes.push(["mpkg", "Apple Installer Package", "application/vnd.apple.installer+xml"]);
mimeTypes.push(["odp", "OpenDocument presentation document", "application/vnd.oasis.opendocument.presentation"]);
mimeTypes.push(["ods", "OpenDocument spreadsheet document", "application/vnd.oasis.opendocument.spreadsheet"]);
mimeTypes.push(["odt", "OpenDocument text document", "application/vnd.oasis.opendocument.text"]);
mimeTypes.push(["oga", "OGG audio", "audio/ogg"]);
mimeTypes.push(["ogv", "OGG video", "video/ogg"]);
mimeTypes.push(["ogx", "OGG", "application/ogg"]);
mimeTypes.push(["opus", "Opus audio", "audio/opus"]);
mimeTypes.push(["otf", "OpenType font", "font/otf"]);
mimeTypes.push(["png", "Portable Network Graphics", "image/png"]);
mimeTypes.push(["pdf", "Adobe Portable Document Format (PDF)", "application/pdf"]);
mimeTypes.push(["php", "Hypertext Preprocessor (Personal Home Page)", "application/x-httpd-php"]);
mimeTypes.push(["ppt", "Microsoft PowerPoint", "application/vnd.ms-powerpoint"]);
mimeTypes.push(["pptx", "Microsoft PowerPoint (OpenXML)", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]);
mimeTypes.push(["rar", "RAR archive", "application/vnd.rar"]);
mimeTypes.push(["rtf", "Rich Text Format (RTF)", "application/rtf"]);
mimeTypes.push(["sh", "Bourne shell script", "application/x-sh"]);
mimeTypes.push(["svg", "Scalable Vector Graphics (SVG)", "image/svg+xml"]);
mimeTypes.push(["swf", "Small web format (SWF) or Adobe Flash document", "application/x-shockwave-flash"]);
mimeTypes.push(["tar", "Tape Archive (TAR)", "application/x-tar"]);
mimeTypes.push(["tif", "Tagged Image File Format (TIFF)", "image/tiff"]);
mimeTypes.push(["tiff", "Tagged Image File Format (TIFF)", "image/tiff"]);
mimeTypes.push(["ts", "MPEG transport stream", "video/mp2t"]);
mimeTypes.push(["ttf", "TrueType Font", "font/ttf"]);
mimeTypes.push(["txt", "Text, (generally ASCII or ISO 8859-n)", "text/plain"]);
mimeTypes.push(["vsd", "Microsoft Visio", "application/vnd.visio"]);
mimeTypes.push(["wav", "Waveform Audio Format", "audio/wav"]);
mimeTypes.push(["weba", "WEBM audio", "audio/webm"]);
mimeTypes.push(["webm", "WEBM video", "video/webm"]);
mimeTypes.push(["webp", "WEBP image", "image/webp"]);
mimeTypes.push(["woff", "Web Open Font Format (WOFF)", "font/woff"]);
mimeTypes.push(["woff2", "Web Open Font Format (WOFF)", "font/woff2"]);
mimeTypes.push(["xhtml", "XHTML", "application/xhtml+xml"]);
mimeTypes.push(["xls", "Microsoft Excel", "application/vnd.ms-excel"]);
mimeTypes.push(["xlsx", "Microsoft Excel (OpenXML)", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]);
mimeTypes.push(["xml", "XML", "application/xml"]);
mimeTypes.push(["xul", "XUL", "application/vnd.mozilla.xul+xml"]);
mimeTypes.push(["zip", "ZIP archive", "application/zip"]);
mimeTypes.push(["3gp", "3GPP audio/video container", "video/3gpp"]);
mimeTypes.push(["3g2", "3GPP2 audio/video container", "video/3gpp2"]);
mimeTypes.push(["7z", "7-zip archive", "application/x-7z-compressed"]);

export function resolveMimeType(file: File): MimeType {
  const extension = file.name.split(/[.]+/).pop();

  if (extension) {
    const type = mimeTypes.find((entry: string[]) => {

      return entry[0].toLowerCase() === extension.toLowerCase()
    });

    if (type) {
      return {extension: type[0], description: type[1], MIMEType: type[2]}
    }
  }
  return {extension: 'unknown', description: 'unknown', MIMEType: 'unknown'}

}
