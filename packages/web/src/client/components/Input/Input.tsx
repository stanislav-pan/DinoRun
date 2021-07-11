import React, {
  FC,
  InputHTMLAttributes,
  ChangeEvent,
  useCallback,
} from "react";
import { useFormContext } from "react-hook-form";
import cn from "classnames";

import { maskPhoneNumber } from "@utils/mask-phone-number";

import styles from "./Input.module.css";
import { InputWrapper } from "./InputWrapper";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  info?: string;
}

export const Input: FC<InputProps> = ({
  name,
  label,
  info,
  className,
  ...props
}: InputProps) => {
  const { register, errors, setValue } = useFormContext();

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (name === "phone") {
        setValue(name, maskPhoneNumber(event.target.value));
      } else {
        setValue(name, event.target.value);
      }
    },
    [name, setValue]
  );

  return (
    <InputWrapper name={name} label={label} info={info} errors={errors}>
      <input
        id={name}
        name={name}
        className={cn(styles.input, className)}
        onChange={onChange}
        ref={register}
        {...props}
      />
    </InputWrapper>
  );
};
