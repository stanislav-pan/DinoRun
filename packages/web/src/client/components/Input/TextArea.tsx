import React, { FC, ChangeEvent, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import cn from "classnames";
import styles from "./Input.module.css";

import { InputWrapper } from "./InputWrapper";

interface InputProps {
  name: string;
  label?: string;
  info?: string;
}

export const TextArea: FC<InputProps> = ({ name, label, info }: InputProps) => {
  const { register, errors, setValue } = useFormContext();

  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(name, event.target.value);
    },
    [name]
  );

  return (
    <InputWrapper name={name} label={label} info={info} errors={errors}>
      <div className={cn(styles.textAreaWrapper)}>
        <textarea
          className={cn(styles.textArea, "overflow-y-auto resize-none")}
          id={name}
          name={name}
          rows={5}
          ref={register}
          onChange={onChange}
          placeholder="Input message ..."
        />
      </div>
    </InputWrapper>
  );
};
