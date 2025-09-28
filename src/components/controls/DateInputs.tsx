export default function DateInputs({
  start,
  end,
  onStartChange,
  onEndChange,
}: {
  start: string;
  end: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
}) {

  return (
    <div className="date-inputs">
      <label className="dates-label-row">
        <span>Start Date</span>
        <input
          type="date"
          value={start}
          onChange={(e) => onStartChange(e.target.value)}
        />
      </label>

      <label className="dates-label-row">
        <span>End Date</span>
        <input
          type="date"
          value={end}
          onChange={(e) => onEndChange(e.target.value)}
        />
      </label>
    </div>
  );
}
