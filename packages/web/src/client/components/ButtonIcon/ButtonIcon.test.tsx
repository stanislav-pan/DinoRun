import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ButtonIcon } from "./ButtonIcon";

describe("Тестирование компонента ButtonIcon", () => {
  it("Должен рендерится с заданными текстом и классом", () => {
    const className = "test-class";
    const btnText = "test me";

    render(<ButtonIcon className={className}>{btnText}</ButtonIcon>);

    const btn = screen.getByText(btnText);

    expect(btn).toHaveClass(className);
  });
});
