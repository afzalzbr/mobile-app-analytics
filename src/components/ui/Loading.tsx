type Props = {
  message?: string;
  minHeight?: number; // e.g., 200 to reserve space
};

export default function Loading({ message = "Loading…", minHeight = 160 }: Props) {
  return (
    <div
      className="loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{ minHeight }}  // keep dynamic height via style
    >
      <div className="loading__row">
        <div className="spinner" aria-hidden />
        <span className="loading__text">{message}</span>
      </div>
    </div>
  );
}
