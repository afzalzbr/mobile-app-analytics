import { render, screen } from "@testing-library/react";
import Table from "../components/table/Table";
import type { Response } from "../types";
import { toAppSeries } from "../lib/normalize";

const mockData: Response = [
  {
    id: 1,
    name: "App 1",
    icon: "https://example.com/icon.png",
    data: [
      ["2023-01-01", 100, 200],
      ["2023-01-02", 200, 300],
    ],
  },
  {
    id: 2,
    name: "App 2",
    icon: "https://example.com/icon.png",
    data: [
      ["2023-01-01", 150, 250],
      ["2023-01-02", 250, 350],
    ],
  },
];

const data = toAppSeries(mockData);

describe("Table", () => {
  it("renders a table", () => {
    render(<Table data={data} start="2023-01-01" end="2023-01-02" />);

    expect(screen.getByText("App Name")).toBeInTheDocument();
    expect(screen.getByText("Downloads")).toBeInTheDocument();
  });

  it("does not render a table if data is empty", () => {
    render(<Table data={[]} start="2023-01-01" end="2023-01-02" />);

    expect(screen.queryByText("App Name")).not.toBeInTheDocument();
    expect(screen.queryByText("Downloads")).not.toBeInTheDocument();
  });
});
