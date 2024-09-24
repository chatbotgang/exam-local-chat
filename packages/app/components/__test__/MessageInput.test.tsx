import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MessageInput from "../MessageInput";

describe("messageInput", () => {
  it("renders correctly", () => {
    render(<MessageInput onSendMessage={() => {}} />);
    const textarea = screen.getByPlaceholderText("Type a message...");
    expect(textarea).toBeInTheDocument();
  });

  it("updates message state on input change", async () => {
    const user = userEvent.setup();
    render(<MessageInput onSendMessage={() => {}} />);
    const textarea = screen.getByPlaceholderText("Type a message...");

    await user.type(textarea, "Hello, world!");
    expect(textarea).toHaveValue("Hello, world!");
  });

  it("does not call onSendMessage on Shift+Enter", async () => {
    const user = userEvent.setup();
    const mockSendMessage = vi.fn();
    render(<MessageInput onSendMessage={mockSendMessage} />);
    const textarea = screen.getByPlaceholderText("Type a message...");

    await user.type(textarea, "Test message");
    await user.keyboard("{Shift>}{Enter}{/Shift}");

    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});
