import React, { FC } from "react";

import { Button } from "@components/Button";
import { Input } from "@components/Input/Input";
import { TEXTS } from "@core/translate";

export const SignInView: FC = () => (
  <>
    <Input
      name="login"
      label="Login"
      type="text"
      placeholder={TEXTS.ENTER_LOGIN}
    />
    <Input
      name="password"
      label="Password"
      type="password"
      placeholder={TEXTS.ENTER_PASSWORD}
      autoComplete="on"
    />
    <Button type="submit">{TEXTS.SIGN_IN}</Button>
  </>
);
