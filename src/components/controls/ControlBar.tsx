import MeasureToggle from "./MeasureToggle";
import DateInputs from "./DateInputs";
import type { Measure } from "../../types";

export default function ControlsBar({
  start,
  end,
  measure,
  onStartChange,
  onEndChange,
  onMeasureChange,
}: {
  start: string;
  end: string;
  measure: Measure;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
  onMeasureChange: (m: Measure) => void;
}) {
  return (
    <div>
      <DateInputs
        start={start}
        end={end}
        onStartChange={onStartChange}
        onEndChange={onEndChange}
      />
      <MeasureToggle value={measure} onChange={onMeasureChange} />
    </div>
  );
}
