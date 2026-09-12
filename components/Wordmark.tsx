export default function Wordmark({
  size = "text-xl",
  tagline = false,
}: {
  size?: string;
  tagline?: boolean;
}) {
  return (
    <div>
      <span className={`font-heading font-extrabold tracking-tight text-ink dark:text-white ${size}`}>
        EAZ<span className="text-amber">Z</span>Y
      </span>
      {tagline && <p className="text-xs text-muted">Fast. Reliable. Eazzy.</p>}
    </div>
  );
}
