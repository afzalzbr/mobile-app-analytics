import { render, screen } from "@testing-library/react";
import Chart from "../components/chart/Chart";
import { toAppSeries } from "../lib/normalize";
import type { Response } from "../types";

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

describe("Chart", () => {
  it("renders a chart", () => {
    render(
      <div style={{ width: 600, height: 400 }}>
        <Chart
          data={data}
          start="2023-01-01"
          end="2023-01-02"
          measure="downloads"
        />
      </div>,
    );
    expect(screen.getByText("Downloads")).toBeInTheDocument();
  });

  it("renders the title and subtitle", () => {
    render(
      <Chart
        data={data}
        start="2023-01-01"
        end="2023-01-02"
        measure="downloads"
      />,
    );
    expect(screen.getByText("Downloads by App")).toBeInTheDocument();
    expect(
      screen.getByText(/Jan 01, 2023 - Jan 02, 2023/i),
    ).toBeInTheDocument();
  });

  it("does not render a chart if data is empty", () => {
    render(
        <Chart
          data={[]}
          start="2023-01-01"
          end="2023-01-02"
          measure="downloads"
        />
    );
    expect(screen.queryByText("Downloads")).not.toBeInTheDocument();
  });
});
