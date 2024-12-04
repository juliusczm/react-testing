import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  it("should render user name", () => {
    const user: User = {
      id: 1,
      name: "John Doe",
    };

    render(<UserAccount user={user} />);

    const userName = screen.getByText("John Doe");
    expect(userName).toBeInTheDocument();
  });

  it("should render edit button if user is admin", () => {
    const user: User = {
      id: 1,
      name: "John Doe",
      isAdmin: true,
    };

    render(<UserAccount user={user} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render button when user is not admin", () => {
    const user: User = {
      id: 1,
      name: "John Doe",
    };

    render(<UserAccount user={user} />);

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
});
