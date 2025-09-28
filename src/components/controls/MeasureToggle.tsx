import type { Measure } from "../../types";

export default function MeasureToggle({
  value,
  onChange,
}: {
  value: Measure;
  onChange: (m: Measure) => void;
}) {
  return (
    <div className="measure-toggle">
      <button
        type="button"
        onClick={() => onChange("downloads")}
        className={value === "downloads" ? "selected" : ""}
      >
        Downloads
      </button>
      <button
        type="button"
        onClick={() => onChange("revenue")}
        className={value === "revenue" ? "selected" : ""}
      >
        Revenue
      </button>
    </div>
  );
}
