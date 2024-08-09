import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { readDataUriFromFile } from "../../app/lib/file";
import LogInForm from "../../app/components/LogInForm";

vi.mock("../../app/lib/file.js", () => ({
  readDataUriFromFile: vi.fn().mockResolvedValue("data:image/png;base64,abc"),
}));

describe("LogInForm", () => {
  const mockOnUserLogin = vi.fn();
  const mockOnSetUserAvatar = vi.fn();

  beforeEach(() => {
    mockOnUserLogin.mockClear();
    mockOnSetUserAvatar.mockClear();
  });

  it("allows user to enter username and login", () => {
    render(
      <LogInForm
        onUserLogin={mockOnUserLogin}
        onSetUserAvatar={mockOnSetUserAvatar}
        userAvatar=""
      />,
    );

    const input = screen.getByPlaceholderText<HTMLInputElement>(
      "enter your username",
    );
    fireEvent.change(input, { target: { value: "user" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockOnUserLogin).toHaveBeenCalledWith("user");
    expect(input.value).toBe("");
  });

  it("allows user to upload an avatar", async () => {
    const dataUri = "data:image/png;base64,abc";
    const file = new File([""], "test.png", { type: "image/png" });

    render(
      <LogInForm
        onUserLogin={mockOnUserLogin}
        onSetUserAvatar={mockOnSetUserAvatar}
        userAvatar=""
      />,
    );

    const input = screen.getByTestId("avatar-upload");

    fireEvent.change(input, { target: { files: [file] } });

    expect(readDataUriFromFile).toHaveBeenCalledWith(file);

    await screen.findByAltText("User Avatar");
    expect(mockOnSetUserAvatar).toHaveBeenCalledWith(dataUri);
  });

  it("displays user avatar if provided", () => {
    const dataUri = "data:image/png;base64,abc";
    render(
      <LogInForm
        onUserLogin={mockOnUserLogin}
        onSetUserAvatar={mockOnSetUserAvatar}
        userAvatar={dataUri}
      />,
    );

    const avatar = screen.getByAltText("User Avatar");
    expect(avatar).toHaveAttribute("src", dataUri);
  });
});
