import Tile from "./Tile";
import type { LetterStatus } from "#/store/BoardContext";

// Row receives one row of letters and renders one tile per character slot.
type RowProps = {
  letters: string[];
  statuses: (LetterStatus | null)[];
  multipliers: (number | null)[];
  activeCol: number | null;
  onTileClick: (col: number) => void;
};

export default function Row({
  letters,
  statuses,
  multipliers,
  activeCol,
  onTileClick,
}: RowProps) {
  return (
    <div className="flex flex-row gap-2 justify-evenly items-center">
      {letters.map((letter, i) => (
        <Tile
          key={i}
          value={letter}
          status={statuses[i]}
          multiplier={multipliers[i]}
          active={activeCol === i}
          solution={false}
          // Tell the board which column was clicked; the board owns active position.
          onClick={() => onTileClick(i)}
        />
      ))}
    </div>
  );
}
