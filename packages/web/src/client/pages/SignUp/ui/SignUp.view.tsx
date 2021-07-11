import React, { FC } from "react";

import { Button } from "@components/Button";
import { Input } from "@components/Input/Input";
import { TEXTS } from "@core/translate";

export const SignUpView: FC = () => (
  <>
    <Input name="email" type="email" placeholder={TEXTS.EMAIL} />
    <Input name="login" type="text" placeholder={TEXTS.LOGIN} />
    <Input name="first_name" type="text" placeholder={TEXTS.NAME} />
    <Input name="second_name" type="text" placeholder={TEXTS.SURNAME} />
    <Input name="phone" type="tel" placeholder={TEXTS.PHONE} />
    <Input
      name="password"
      type="password"
      placeholder={TEXTS.PASSWORD}
      autoComplete="on"
    />
    <Button type="submit">{TEXTS.SIGN_UP}</Button>
  </>
);
