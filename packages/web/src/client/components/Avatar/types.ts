import { uploadCallback } from "@utils/file-uploader";

export type OwnProps = {
  src?: string | null;

  /** Not required arg. If not set out interface of uploading will not display */
  upload?: uploadCallback;
};

export type Props = OwnProps;
