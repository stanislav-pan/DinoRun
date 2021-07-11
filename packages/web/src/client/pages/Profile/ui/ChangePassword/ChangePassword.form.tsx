import React, { FC } from "react";

import { Button } from "@components/Button";
import { Input } from "@components/Input/Input";
import { TEXTS } from "@core/translate";

export const ChangePasswordForm: FC = () => (
  <>
    <Input
      name="oldPassword"
      label={TEXTS.OLD_PASSWORD}
      type="password"
      placeholder={TEXTS.ENTER_PASSWORD}
    />
    <Input
      name="newPassword"
      label={TEXTS.NEW_PASSWORD}
      type="password"
      placeholder={TEXTS.ENTER_NEW_PASSWORD}
    />
    <Input
      name="newPasswordConfirm"
      label={TEXTS.CONFIRM_NEW_PASSWORD}
      type="password"
      placeholder={TEXTS.ENTER_PASSWORD_AGAIN}
    />
    <Button type="submit">{TEXTS.SAVE}</Button>
  </>
);
