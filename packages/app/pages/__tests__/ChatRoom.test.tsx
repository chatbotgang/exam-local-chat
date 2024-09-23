import { render, screen } from "@testing-library/react";
import ChatRoom from "../ChatRoom";

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("chatRoom", () => {
  it("renders MessageList and MessageInput components", () => {
    render(<ChatRoom storedName="TestUser" />);
    expect(screen.getByTestId("message-list")).toBeInTheDocument();
    expect(screen.getByTestId("message-input")).toBeInTheDocument();
  });

  it("can see the joined system meaage", () => {
    render(<ChatRoom storedName="TestUser" />);
    expect(screen.getAllByText("TestUser joined")[0]).toBeInTheDocument();
  });
});
