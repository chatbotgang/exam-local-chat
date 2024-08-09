import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import MessageInput from "../../app/components/MessageInput";
import { MessageType } from "../../app/enums/message";

vi.mock("../../app/lib/id", () => ({
  generateId: vi.fn(() => "test-id"),
}));

describe("MessageInput", () => {
  const mockOnSendMessage = vi.fn();
  const mockOnSetReply = vi.fn();

  const user = {
    username: "user",
    userAvatar: "avatar.png",
  };

  beforeEach(() => {
    mockOnSendMessage.mockClear();
    mockOnSetReply.mockClear();
  });

  it("allows sending message while Enter key press", () => {
    render(
      <MessageInput
        user={user}
        reply={null}
        onSendMessage={mockOnSendMessage}
        onSetReply={mockOnSetReply}
      />,
    );

    const textarea =
      screen.getByPlaceholderText<HTMLTextAreaElement>("Type a message...");
    fireEvent.change(textarea, { target: { value: "test" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    expect(mockOnSendMessage).toHaveBeenCalledWith({
      id: "test-id",
      type: MessageType.TEXT,
      main: {
        ...user,
        content: "test",
      },
      reply: null,
      createdAt: expect.any(Number),
    });
    expect(mockOnSetReply).toHaveBeenCalledWith(null);
    expect(textarea.value).toBe("");
  });

  it("allows inserting line breaks with Shift + Enter", () => {
    render(
      <MessageInput
        user={user}
        reply={null}
        onSendMessage={mockOnSendMessage}
        onSetReply={mockOnSetReply}
      />,
    );

    const textarea =
      screen.getByPlaceholderText<HTMLTextAreaElement>("Type a message...");
    fireEvent.change(textarea, { target: { value: "test" } });
    fireEvent.keyDown(textarea, {
      key: "Enter",
      code: "Enter",
      shiftKey: true,
    });
    fireEvent.change(textarea, { target: { value: "test\ntest" } });

    expect(textarea.value).toBe("test\ntest");
    expect(mockOnSendMessage).not.toHaveBeenCalled();
  });

  it("prevents sending messages with only spaces or line breaks", () => {
    render(
      <MessageInput
        user={user}
        reply={null}
        onSendMessage={mockOnSendMessage}
        onSetReply={mockOnSetReply}
      />,
    );

    const textarea =
      screen.getByPlaceholderText<HTMLTextAreaElement>("Type a message...");
    fireEvent.change(textarea, { target: { value: "    " } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    expect(mockOnSendMessage).not.toHaveBeenCalled();
    expect(textarea.value).toBe("");

    fireEvent.change(textarea, { target: { value: "\n\n" } });
    fireEvent.keyDown(textarea, { key: "Enter", code: "Enter" });

    expect(mockOnSendMessage).not.toHaveBeenCalled();
    expect(textarea.value).toBe("");
  });
});
