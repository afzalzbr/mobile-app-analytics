import { useMemo, useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { AppSeries, Measure } from "../../types";
import { dayjsUtc } from "../../dayjs";

type ChartProps = {
  data: AppSeries[]; // normalized
  start: string;
  end: string;
  measure: Measure; // "downloads" | "revenue"
};

function formatSubtitle(startISO: string, endISO: string) {
  const s = dayjsUtc(startISO).format("MMM DD, YYYY");
  const e = dayjsUtc(endISO).format("MMM DD, YYYY");
  return `${s} - ${e}`;
}

const Chart = ({ data, start, end, measure }: ChartProps) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const { seriesData, titleText, yAxisTitle, subtitleText } = useMemo(() => {
    const startMs = dayjsUtc(start).valueOf();
    const endMs = dayjsUtc(end).valueOf();

    const seriesData: Highcharts.SeriesOptionsType[] = data.map((series) => {
      const points = series.points
        .filter((p) => {
          const t = dayjsUtc(p.date).valueOf();
          return t >= startMs && t <= endMs; // within range (inclusive)
        })
        .map((p) => ({
          x: dayjsUtc(p.date).valueOf(),
          y: measure === "downloads" ? p.downloads : p.revenueCents / 100, // $ when revenue
        }));

      return {
        name: series.name,
        type: "line",
        data: points,
      };
    });

    return {
      seriesData,
      titleText:
        measure === "downloads" ? "Downloads by App" : "Revenue by App",
      yAxisTitle: measure === "downloads" ? "Downloads" : "Revenue ($)",
      subtitleText: formatSubtitle(start, end),
    };
  }, [data, start, end, measure]);

  if (!seriesData.length) return null;

  const options: Highcharts.Options = {
    title: { text: titleText },
    subtitle: { text: subtitleText },
    yAxis: { title: { text: yAxisTitle } },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          const v = (this as any).value as number;
          return Highcharts.dateFormat("%b %d, %y", v);
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: { hover: { enabled: false } },
        },
      },
    },
    tooltip: {
      shared: true,
      xDateFormat: "%b %e, %Y",
      pointFormatter: function () {
        const val = this.y as number;
        const label =
          measure === "downloads"
            ? val.toLocaleString()
            : val.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
              });
        return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${label}</b><br/>`;
      },
    },
    series: seriesData,
    accessibility: { enabled: false },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
    />
  );
};

export default Chart;
