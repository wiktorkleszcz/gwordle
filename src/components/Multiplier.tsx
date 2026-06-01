import { formatMultiplier } from "#/game/multipliers";

// Shared presentational badge for a multiplier value. Used both in the tiles
// (corner odds) and in Actions (next to the sliders) so formatting and the
// "zeroed" look live in one place.
type MultiplierProps = {
  value: number;
  className?: string;
};

export default function Multiplier({ value, className = "" }: MultiplierProps) {
  // A claimed duplicate (x0.00) is dimmed so it reads as "no payout".
  const muted = value === 0 ? "opacity-50" : "";

  return (
    <span className={`tabular-nums ${muted} ${className}`}>
      {formatMultiplier(value)}
    </span>
  );
}
