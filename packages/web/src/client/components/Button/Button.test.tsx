import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Button } from "./Button";

describe("Тестирование компонента Button", () => {
  it("Должен рендерится с заданными текстом и классом", () => {
    const className = "test-class";
    const btnText = "test me";

    render(<Button className={className}>{btnText}</Button>);

    const btn = screen.getByText(btnText);

    expect(btn).toHaveClass(className);
  });
});
