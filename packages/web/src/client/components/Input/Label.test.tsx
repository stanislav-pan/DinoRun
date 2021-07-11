import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Label } from "./Label";

describe("Тестирование компонента Label", () => {
  it("Должен рендерится с заданными children и name", () => {
    const labelText = "test me";
    const labelFor = "label";

    render(
      <Label name={labelFor} visible={true}>
        {labelText}
      </Label>
    );

    const label = screen.getByText(labelText);
    expect(label).toHaveAttribute("for", labelFor);
  });

  it("Должен возвращать null в случае, если visible равен false", () => {
    const labelText = "test me";

    const { container } = render(
      <Label name="label" visible={false}>
        {labelText}
      </Label>
    );

    expect(container.firstChild).toBeNull();
  });
});
