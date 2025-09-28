import { useEffect, useState } from "react";
import type { Response, AppSeries, LoadState } from "../types";
import { toAppSeries } from "../lib/normalize";

const DATA_URL = "/data.json"; // served from public/

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    if (signal) {
      const onAbort = () => {
        clearTimeout(id);
        reject(new DOMException("Aborted", "AbortError"));
      };
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
    }
  });
}

export default function useSalesData() {
  const [state, setState] = useState<LoadState<AppSeries[]>>({ status: "idle" });

  useEffect(() => {
    const abort = new AbortController();

    (async () => {
      try {
        setState({ status: "loading" });
        
        // simulating latency so the loader is visible
        await sleep(2000, abort.signal);

        const res = await fetch(DATA_URL, {
          signal: abort.signal,
          headers: { Accept: "application/json" },
        });
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const raw = (await res.json()) as Response;
        if (!Array.isArray(raw)) throw new Error("Invalid data format");
        const data = toAppSeries(raw); // normalize

        setState({ status: "success", data });
      } catch (e: any) {
        if (e?.name === "AbortError") return;
        setState({ status: "error", error: e?.message ?? "Failed to load data" });
      }
    })();

    return () => abort.abort();
  }, []);

  return state;
}
