import { render, screen } from "@testing-library/react";
import App from "../App";

// Mocking the data hook so App doesn't show the loader
jest.mock("../hooks/useSalesData", () => ({
  __esModule: true,
  default: () => ({
    status: "success",
    data: [], // empty is fine for this test
  }),
}));

describe("App", () => {
  it("renders start and end date inputs", () => {
    render(<App />);

    expect(screen.getByText(/start date/i)).toBeInTheDocument();
    expect(screen.getByText(/end date/i)).toBeInTheDocument();
  });
});
