import type { LetterStatus } from "#/store/BoardContext";
import Multiplier from "./Multiplier";

// Tile is a presentational square: it displays a letter, colors itself by its
// check status, highlights when active, and shows its potential multiplier.
type TileProps = {
  value: string;
  status: LetterStatus | null;
  active: boolean;
  solution: boolean;
  // null = nothing to show (empty tile); a number renders the odds badge.
  multiplier: number | null;
  onClick: () => void;
};

// Background color reflects the result of checking the guessed letter.
const STATUS_CLASS: Record<LetterStatus, string> = {
  correct: "bg-green-600",
  present: "bg-yellow-600",
  absent: "bg-stone-700",
};

export default function Tile({
  value,
  status,
  active,
  solution,
  multiplier,
  onClick,
}: TileProps) {
  const background = status
    ? `${STATUS_CLASS[status]} shadow-inbox-lg`
    : "bg-stone-800 shadow-inbox-sm";

  return (
    <div
      className={`relative flex flex-col justify-center items-center w-22 h-22 rounded-xl text-6xl text-white cursor-pointer ${background} ${active ? "shadow-inbox-lg bg-stone-900" : ""} ${!solution && !active ? "hover:shadow-inbox-lg" : ""} transition-colors`}
      onClick={onClick}
    >
      {value}
      {multiplier !== null && (
        <Multiplier
          value={multiplier}
          className="absolute bottom-1 right-1.5 text-xs text-white/80"
        />
      )}
    </div>
  );
}
