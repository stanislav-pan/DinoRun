import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { ButtonIcon } from "@components/ButtonIcon";
import { PencilSvg } from "@icons/PencilSvg";
import { TickSvg } from "@icons/TickSvg";
import { parseFormValues } from "@utils/parse-form-values";

import { Props } from "./types";
import styles from "./BriefUserInformation.module.css";

export const BriefUserInformation: FC<Props> = ({
  name,
  changeName,
  children,
}: Props) => {
  const [displayedNameInput, setDisplayedNameInput] = useState(false);

  const changeNameInner = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();

      const { displayNameInput } = parseFormValues<{
        displayNameInput: string;
      }>(event.currentTarget);

      if (displayNameInput === name || !changeName) {
        return;
      }

      changeName(displayNameInput);
    },
    [changeName, name]
  );

  useEffect(() => {
    setDisplayedNameInput(false);
  }, [name]);

  const focus = (input: HTMLInputElement | null) => {
    if (!input) {
      return;
    }

    input.focus();
  };

  return (
    <div className="flex max-w-xs">
      <div className="relative mr-5">{children}</div>
      <div className="my-auto">
        {displayedNameInput && (
          <form className="flex" onSubmit={changeNameInner}>
            <input
              name="displayNameInput"
              type="text"
              defaultValue={name}
              className={styles.nameInput}
              ref={focus}
            />

            <ButtonIcon type="submit">
              <TickSvg />
            </ButtonIcon>
          </form>
        )}

        {!displayedNameInput && (
          <div className="flex">
            <p className="font-medium leading-6">{name}</p>

            {typeof changeName === "function" && (
              <ButtonIcon onClick={() => setDisplayedNameInput(true)}>
                <PencilSvg />
              </ButtonIcon>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
