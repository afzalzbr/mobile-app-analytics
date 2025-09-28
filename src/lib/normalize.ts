import type { Response, AppSeries } from "../types";

export function toAppSeries(raw: Response): AppSeries[] {
  return raw.map(({ id, name, icon, data }) => ({
    id,
    name,
    icon,
    points: data.map(([date, downloads, revenueCents]) => ({
      date,
      ts: Date.parse(date),
      downloads,
      revenueCents,
    })),
  }));
}