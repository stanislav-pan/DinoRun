import React, { FC } from "react";

import { Wrapper } from "@components/Wrapper";
import { SignInSvg } from "@icons/SignInSvg";

import { SignInForm } from "./ui/SignIn.form";

export const SignIn: FC = () => {
  return (
    <Wrapper>
      <SignInSvg />
      <SignInForm />
    </Wrapper>
  );
};
