import React, { FC } from "react";

import { Wrapper } from "@components/Wrapper";
import { SignUpSvg } from "@icons/SignUpSvg";

import { SignUpForm } from "./ui/SignUp.form";

export const SignUp: FC = () => {
  return (
    <Wrapper>
      <SignUpSvg />
      <SignUpForm />
    </Wrapper>
  );
};
