import React, { FC, useMemo } from "react";

import { uploader } from "@utils/file-uploader";
import { ButtonIcon } from "@components/ButtonIcon";
import { AvatarStubSvg } from "@icons/AvatarStubSvg";
import { UploadingPhotoSvg } from "@icons/UploadingPhotoSvg";

import { Props } from "./types";
import styles from "./Avatar.module.css";

export const Avatar: FC<Props> = ({ src, upload }: Props) => {
  const image = useMemo(() => {
    if (!src) {
      return <AvatarStubSvg />;
    }

    return <img src={src} alt="avatar" className={styles.image} />;
  }, [src]);

  return (
    <div className={styles.avatar}>
      {image}

      {typeof upload === "function" && (
        <ButtonIcon
          onClick={() => uploader(upload)}
          className={styles.changeBtn}
        >
          <UploadingPhotoSvg />
        </ButtonIcon>
      )}
    </div>
  );
};
