import { useGameSettings } from "#/store/GameSettingContext";
import { useBoard } from "#/store/BoardContext";
import { useRef } from "react";
import Row from "./Row";
import SolutionRow from "./SolutionRow";

// Board renders the grid and turns key presses into context dispatches.
// Letters and cursor position now live in BoardContext; the grid size still
// comes from the settings context.
export default function Board() {
  const { gameState } = useGameSettings();
  const {
    board,
    boardDispatch,
    position,
    positionDispatch,
    submit,
    reset,
    multipliers,
    finalMultiplier,
    isSpinning,
    setIsSpinning,
  } = useBoard();
  const boardRef = useRef<HTMLDivElement>(null);

  const { length, tries } = gameState;
  const locked = board.phase === "result";

  // Per-tile multipliers are derived from the letters (with duplicate
  // de-duplication), not stored, so they recompute only when letters change.

  // One keyboard handler controls letters, deleting, row changes, and arrows.
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    // In 'result' the board is frozen: only Enter (to reset) is accepted.
    if (locked) {
      if (e.key === "Enter") {
        setIsSpinning(false);
        reset();
      }
      return;
    }

    if (e.key === "ArrowLeft") {
      positionDispatch({ type: "moveLeft", length });
      return;
    }

    if (e.key === "ArrowRight") {
      positionDispatch({ type: "moveRight", length, tries });
      return;
    }

    if (e.key === "ArrowUp") {
      positionDispatch({ type: "moveUp" });
      return;
    }

    if (e.key === "ArrowDown") {
      positionDispatch({ type: "moveDown", tries });
      return;
    }

    if (/^[a-zA-Z]$/.test(e.key)) {
      boardDispatch({
        type: "setLetter",
        row: position.row,
        col: position.col,
        value: e.key.toUpperCase(),
      });
      positionDispatch({ type: "moveRight", length, tries });
      return;
    }

    if (e.key === "Backspace") {
      // Clear the current tile, or move back and clear the previous one.
      if (board.letters[position.row][position.col]) {
        boardDispatch({
          type: "clearLetter",
          row: position.row,
          col: position.col,
        });
        return;
      }

      if (position.col > 0) {
        boardDispatch({
          type: "clearLetter",
          row: position.row,
          col: position.col - 1,
        });
        positionDispatch({ type: "moveLeft", length });
        return;
      }

      if (position.row > 0) {
        boardDispatch({
          type: "clearLetter",
          row: position.row - 1,
          col: length - 1,
        });
        positionDispatch({ type: "moveLeft", length });
      }

      return;
    }

    if (e.key === "Enter") {
      // Draws the word and checks every row; no-op if the board is not ready.
      if (gameState.mode === "auto") {
        setIsSpinning(true);
        return;
      }
      submit();
    }
  }

  return (
    <div
      ref={boardRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-240 h-240 bg-stone-800 rounded-xl flex flex-col justify-between items-center outline-none p-10 shadow-outbox-lg"
    >
      <h1 className="text-white text-6xl">Board</h1>
      <div className="flex flex-col justify-center items-center gap-2 h-full">
        {board.letters.map((row, i) => (
          <Row
            key={i}
            letters={row}
            statuses={board.statuses[i]}
            multipliers={multipliers[i]}
            // Hide the cursor while locked so nothing looks editable.
            activeCol={!locked && position.row === i ? position.col : null}
            onTileClick={(col) => {
              // Tiles are not selectable once the board is locked.
              if (locked) return;
              // After clicking a tile, focus the board so keyboard input still works.
              boardRef.current?.focus();
              positionDispatch({ type: "set", row: i, col });
            }}
          />
        ))}
        {/* The solution sits under the grid: "?" while typing, revealed on result. */}
        <SolutionRow
          solution={board.solution}
          length={length}
          phase={board.phase}
        />
        <p className="text-white text-2xl">
          Payout: {(finalMultiplier * gameState.stake).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
