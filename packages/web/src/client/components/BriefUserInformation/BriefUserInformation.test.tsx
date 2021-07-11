import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { BriefUserInformation } from "./BriefUserInformation";

describe("Тестирование компонента BriefUserInformation", () => {
  it(`Должен отображать переданное имя, а также кнопку для перехода 
        в режим редактирования (если была передана функция-обработчик)`, () => {
    const userName = "Ivan Ivanov";
    const changeName = jest.fn();

    const { rerender } = render(
      <BriefUserInformation name={userName}>
        <></>
      </BriefUserInformation>
    );

    screen.getByText(userName);
    expect(screen.queryByRole("button")).toBeNull();

    rerender(
      <BriefUserInformation name={userName} changeName={changeName}>
        <></>
      </BriefUserInformation>
    );

    screen.getByRole("button");
  });

  it("Должен корректно изменять имя", () => {
    const userName = "Ivan Ivanov";
    const newUserName = "SuperCat";

    const changeName = jest.fn();

    const { rerender } = render(
      <BriefUserInformation name={userName} changeName={changeName}>
        <></>
      </BriefUserInformation>
    );

    const btnEditName = screen.getByRole("button");
    userEvent.click(btnEditName);

    const inputName = screen.getByDisplayValue(userName);
    expect(inputName).toHaveFocus();

    userEvent.clear(inputName);

    userEvent.type(inputName, newUserName, {
      initialSelectionStart: 0,
    });

    expect(inputName).toHaveValue(newUserName);

    const btnSubmit = screen.getByRole("button");
    userEvent.click(btnSubmit);

    expect(changeName).toBeCalledWith(newUserName);

    rerender(
      <BriefUserInformation name={newUserName} changeName={changeName}>
        <></>
      </BriefUserInformation>
    );

    screen.getByText(newUserName);
  });
});
