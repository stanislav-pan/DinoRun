import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import { uploader } from "@utils/file-uploader";

import { Avatar } from "./Avatar";

jest.mock("@utils/file-uploader");

describe("Тестирование компонента Avatar", () => {
  it("Должен отображать изображение в случае, если был передан src, иначе должен отображать заглушку", () => {
    const src = "test-src";
    const { rerender } = render(<Avatar src={src} />);

    const img = screen.getByAltText("avatar");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", src);

    rerender(<Avatar />);

    expect(screen.queryByAltText("avatar")).toBeNull();
    expect(screen.getByTestId("avatar-stub"));
  });

  it(`Должен отображать иконку для загрузки изображения в случае, если была передана функция`, () => {
    const upload = jest.fn();

    const { rerender } = render(<Avatar />);
    expect(screen.queryByRole("button")).toBeNull();

    rerender(<Avatar upload={upload} />);

    const uploadBtn = screen.getByRole("button");
    expect(uploadBtn).toBeInTheDocument();

    (uploader as jest.Mock).mockImplementation(() => {
      upload();
    });

    userEvent.click(uploadBtn);

    expect(uploader as jest.Mock).toBeCalled();
    expect(upload).toBeCalled();
  });
});
