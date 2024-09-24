import { render, screen } from "@testing-library/react";
import type { Message, SystemText } from "../../types";
import MessageList from "../MessageList";
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("messageList", () => {
  const mockMessages: Array<Message | SystemText> = [
    {
      id: "1",
      type: "message",
      content: "Hello",
      userName: "User1",
      timestamp: Date.parse("2023-01-01T12:00:00"),
    },
    { id: "2", type: "system", content: "User2 joined the chat" },
    {
      id: "3",
      type: "message",
      content: "Hi there",
      userName: "User2",
      timestamp: Date.parse("2023-01-01T21:00:00"),
    },
  ];

  it("renders correctly with messages", () => {
    render(<MessageList currentUser="User1" messages={mockMessages} />);
    const messageList = screen.getByTestId("message-list");

    expect(messageList.children.length).toBe(4);
  });

  it("scrolls to bottom when messages change", () => {
    const scrollIntoViewMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const { rerender } = render(
      <MessageList currentUser="User1" messages={mockMessages} />,
    );

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ block: "end" });

    // Simulate new message
    const newMessages: Array<Message | SystemText> = [
      ...mockMessages,
      {
        id: "4",
        type: "message",
        content: "New message",
        userName: "User3",
        timestamp: Date.parse("2023-08-01T12:00:00"),
      },
    ];
    rerender(<MessageList currentUser="User1" messages={newMessages} />);

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(2);
  });
});
