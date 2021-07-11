import React, { FC, InputHTMLAttributes } from "react";
import { DeepMap, FieldError } from "react-hook-form";
import { Label } from "./Label";
import { Feedback } from "./Feedback";
import { Info } from "./Info";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  info?: string;
  children: React.ReactChild;
  errors: DeepMap<Record<string, any>, FieldError>;
}

export const InputWrapper: FC<InputProps> = ({
  name,
  label,
  info,
  errors,
  children,
}: InputProps) => {
  return (
    <>
      <Label name={name} visible={!!label}>
        {label}
      </Label>
      {children}
      <Info>{info}</Info>
      <Feedback>{errors[name] && errors[name].message}</Feedback>
    </>
  );
};
