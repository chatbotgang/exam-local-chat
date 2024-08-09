import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Chatroom from "../../app/components/Chatroom";
import { User } from "../../app/models/user";

const mockUser: User = {
  username: "user",
  userAvatar: "/avatar.png",
};

window.HTMLElement.prototype.scrollIntoView = function () {};

describe("Chatroom", () => {
  it("scrolls to bottom when new messages arrived", () => {
    render(<Chatroom user={mockUser} />);

    const inputElement = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(inputElement, { target: { value: "hello" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    const messageList = screen.getByTestId("message-list");
    expect(messageList?.scrollTop).toBe(
      messageList?.offsetHeight - messageList?.clientHeight,
    );
  });
});
