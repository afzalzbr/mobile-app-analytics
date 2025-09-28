export type Response = {
  id: number;
  name: string;
  icon: string;
  data: [date: string, downloads: number, revenue: number][];
}[];

export type AppPoint = {
  date: string;
  ts: number;
  downloads: number;
  revenueCents: number;
};

export type AppSeries = {
  id: number;
  name: string;
  icon: string;
  points: AppPoint[];
};

export type Measure = "downloads" | "revenue";

export type LoadState<T> =
  | { status: "idle" | "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };