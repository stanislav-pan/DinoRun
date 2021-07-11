import { FileUploader } from "./file-uploader";
import { uploadCallback } from "./types";

export const uploader = (upload: uploadCallback): void => {
  FileUploader.upload()
    .then((fileList) => fileList[0])
    .then((file) =>
      FileUploader.getBase64(file).then((base64) => ({ file, base64 }))
    )
    .then(({ file, base64 }) => upload(file, base64));
};
