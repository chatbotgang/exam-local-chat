import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../Login";

describe("login Component", () => {
  it("renders correctly", () => {
    const mockSetStoredName = vi.fn();
    render(<Login setStoredName={mockSetStoredName} />);

    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    expect(
      screen.getByText("After entering you can join the chatroom."),
    ).toBeInTheDocument();
  });

  it("updates name state on input change", async () => {
    const user = userEvent.setup();
    render(<Login setStoredName={() => {}} />);
    const input = screen.getByRole("textbox");

    await user.type(input, "John Doe");

    expect(input).toHaveValue("John Doe");
  });
});
