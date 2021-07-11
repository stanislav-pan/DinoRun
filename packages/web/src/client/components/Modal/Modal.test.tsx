import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { Modal } from "./Modal";

describe("Тестирование компонента Modal", () => {
  it("Должен отображать children и реагировать на нажатия вне модального окна", () => {
    const modalText = "test me";
    const closeModal = jest.fn();

    render(<Modal onCloseModal={closeModal}>{modalText}</Modal>);
    screen.getByText(modalText);

    userEvent.click(screen.getByRole("document"));
    expect(closeModal).toBeCalled();
  });
});
