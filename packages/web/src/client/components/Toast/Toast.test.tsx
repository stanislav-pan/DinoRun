import React from "react";
import { screen, render, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Toast } from "./Toast";

jest.useFakeTimers();

describe("Тестирование компонента Toast", () => {
  it("Должен скрываться через 3 секунды", () => {
    const errorText = "CUSTOM_ERROR";
    const hiddenClasses = ["duration-1000", "opacity-1", "opacity-0"];

    render(<Toast type="error">{errorText}</Toast>);

    screen.getByText(errorText);
    expect(screen.getByRole("alert")).not.toHaveClass(...hiddenClasses);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByRole("alert")).toHaveClass(...hiddenClasses);
  });
});
