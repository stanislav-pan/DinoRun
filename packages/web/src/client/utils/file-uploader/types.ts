export interface IUploadConfig {
  multiple?: boolean;
}

export type uploadCallback = (file: File, base64?: string) => void;
