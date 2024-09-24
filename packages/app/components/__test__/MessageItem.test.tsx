import { render, screen } from "@testing-library/react";
import type { Message } from "../../types";
import MessageItem from "../MessageItem";

describe("messageItem", () => {
  const mockMessage: Message = {
    type: "message",
    id: "1",
    content: "Hello, world!",
    userName: "John Doe",
    timestamp: Date.parse("2023-01-01T12:00:00"),
  };

  it("renders correctly for current user", () => {
    render(<MessageItem message={mockMessage} isCurrentUser key="1" />);

    expect(screen.getByText("John Doe:")).toBeInTheDocument();
    expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
  });
});
