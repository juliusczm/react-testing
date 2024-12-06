import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
  const limit = 255;
  const shortText = "Short text";
  const longText = "a".repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + "...";

  it("should render the full text if less than 255 characters", () => {
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(shortText)).toBeInTheDocument();
  });

  it("should truncated text if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const showMoreButton = screen.getByRole("button", { name: /more/i });
    expect(showMoreButton).toBeInTheDocument();
  });

  it("should expand text when Show More button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/less/i);
  });

  it("should collapse text when Show Less button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const showMoreButton = screen.getByRole("button", { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    const showLessButton = screen.getByRole("button", { name: /less/i });
    await user.click(showLessButton);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showMoreButton).toHaveTextContent(/more/i);
  });
});
