import React, { FC } from "react";

import { Button } from "@components/Button";
import { Input } from "@components/Input/Input";
import { TEXTS } from "@core/translate";

export const EditProfileForm: FC = () => (
  <>
    <Input
      name="login"
      label={TEXTS.USERNAME}
      type="text"
      placeholder={TEXTS.ENTER_USERNAME}
    />
    <Input
      name="firstName"
      label={TEXTS.NAME}
      type="text"
      placeholder={TEXTS.ENTER_NAME}
    />
    <Input
      name="secondName"
      label={TEXTS.SURNAME}
      type="text"
      placeholder={TEXTS.ENTER_SURNAME}
    />
    <Input
      name="email"
      label={TEXTS.EMAIL}
      type="email"
      placeholder={TEXTS.ENTER_EMAIL}
    />
    <Input
      name="phone"
      label={TEXTS.PHONE}
      type="tel"
      placeholder={TEXTS.ENTER_PHONE}
    />
    <Button type="submit">{TEXTS.SAVE}</Button>
  </>
);
