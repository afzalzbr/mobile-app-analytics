import { useEffect, useMemo, useState } from "react";
import type { AppSeries, Measure } from "../types";

/**
 * Keeps UI filter state (start, end, measure).
 * Defaults start/end to the dataset min/max once data is available.
 */
export function useFilters(data?: AppSeries[]) {
  const [start, setStart] = useState<string>("2020-01-01");
  const [end, setEnd] = useState<string>("2020-01-07");
  const [measure, setMeasure] = useState<Measure>("downloads");
  const [initialized, setInitialized] = useState(false);

  // Initialize date range from data once
  useEffect(() => {
    if (!data || !data.length || initialized) return;

    let min = Infinity;
    let max = -Infinity;
    for (const s of data) {
      for (const p of s.points) {
        const t = Date.parse(p.date);
        if (t < min) min = t;
        if (t > max) max = t;
      }
    }
    if (isFinite(min) && isFinite(max)) {
      setStart(new Date(min).toISOString().slice(0, 10));
      setEnd(new Date(max).toISOString().slice(0, 10));
      setInitialized(true);
    }
  }, [data, initialized]);

  // Guard: keep start <= end
  useEffect(() => {
    if (new Date(start) > new Date(end)) {
      // if invalid, snap end to start
      setEnd(start);
    }
  }, [start, end]);

  return useMemo(
    () => ({
      start,
      end,
      measure,
      setStart,
      setEnd,
      setMeasure,
    }),
    [start, end, measure]
  );
}
