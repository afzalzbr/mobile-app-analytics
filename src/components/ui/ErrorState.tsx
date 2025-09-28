type Props = {
  message: string;
};

export default function ErrorState({ message }: Props) {
  return (
    <div className="error" role="alert" aria-live="assertive">
      <div>
        <strong className="error__title">Error:</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}
