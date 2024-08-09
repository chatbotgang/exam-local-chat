import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MessageType } from "../../app/enums/message";
import MessageList from "../../app/components/MessageList";
import { Message } from "../../app/models/message";

const mockMessages: Message[] = [
  {
    id: "1",
    type: MessageType.TEXT,
    main: {
      username: "user",
      userAvatar: "",
      content: "hello",
    },
    reply: null,
    createdAt: Date.now(),
  },
  {
    id: "2",
    type: MessageType.SYSTEM,
    main: {
      username: "system",
      userAvatar: "",
      content: "user Joined",
    },
    reply: null,
    createdAt: Date.now(),
  },
];

describe("MessageList", () => {
  const mockOnSetReply = vi.fn();

  it("renders messages correctly", () => {
    render(
      <MessageList
        messages={mockMessages}
        username="user"
        onSetReply={mockOnSetReply}
      />,
    );

    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("user Joined")).toBeInTheDocument();
  });
});
