import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
  type Dispatch,
  useState,
  type SetStateAction,
} from "react";
import { useGameSettings } from "#/store/GameSettingContext";
import { pickWord } from "#/game/wordBank";
import { computeTileMultipliers } from "#/game/tileMultipliers";
import finalMultiplierCalc from "#/game/finalMultiplier";
import { lengthMultiplier, triesMultiplier } from "#/game/multipliers";

// This context owns the actual game grid: the typed letters, the per-tile
// check results, and the cursor. The grid SIZE (length/tries) is not stored
// here, it lives in the settings context and is read in by the provider below.

// ---------------------------------------------------------------------------
// Letter checking ("prelude"): the result a single tile can have after a guess
// is compared with the solution word.
// ---------------------------------------------------------------------------
export type LetterStatus = "correct" | "present" | "absent";

// The game lifecycle:
//   'input'  - the player is typing, the board is editable and the solution
//              row is hidden behind "?" placeholders,
//   'result' - the guesses have been checked, the solution is revealed and the
//              board is locked until the next reset.
// It is an enum (not a boolean) so future phases like 'checking' (reveal
// animation) or 'win' / 'lose' can be added without touching call sites.
export type GamePhase = "input" | "result";

// Classic Wordle evaluation, done in two passes so duplicate letters are
// counted correctly:
//   1) mark every exact match (right letter, right spot) as 'correct',
//   2) for the rest, mark 'present' only while the solution still has an
//      unused copy of that letter, otherwise 'absent'.
export function checkGuess(guess: string[], solution: string): LetterStatus[] {
  const sol = solution.toUpperCase().split("");
  const result: LetterStatus[] = guess.map(() => "absent");
  const remaining: Record<string, number> = {};

  guess.forEach((raw, i) => {
    const letter = (raw || "").toUpperCase();
    if (letter !== "" && sol[i] === letter) {
      result[i] = "correct";
    }
  });

  sol.forEach((letter, i) => {
    if (result[i] !== "correct") {
      remaining[letter] = (remaining[letter] ?? 0) + 1;
    }
  });

  guess.forEach((raw, i) => {
    const letter = (raw || "").toUpperCase();
    if (result[i] === "correct" || letter === "") return;
    if ((remaining[letter] ?? 0) > 0) {
      result[i] = "present";
      remaining[letter] -= 1;
    }
  });

  return result;
}

// ---------------------------------------------------------------------------
// 1) Board content reducer: the letters, the check statuses, and the solution.
// ---------------------------------------------------------------------------
export type BoardState = {
  letters: string[][];
  // null means "this tile has not been checked yet".
  statuses: (LetterStatus | null)[][];
  // null while typing: the word is only drawn at submit time, so it is never
  // present in state (or React DevTools) during 'input'. Anti-peek by design.
  solution: string | null;
  phase: GamePhase;
};

function createEmptyLetters(tries: number, length: number): string[][] {
  return Array.from({ length: tries }, () => Array.from({ length }, () => ""));
}

function createEmptyStatuses(
  tries: number,
  length: number,
): (LetterStatus | null)[][] {
  return Array.from({ length: tries }, () =>
    Array.from({ length }, () => null),
  );
}

// A row counts as a guess only when every tile has a letter.
function isRowFull(row: string[]): boolean {
  return row.every((letter) => letter !== "");
}

// Submit is allowed only in 'input' phase and only when EVERY row is completely
// filled. Exported so the Actions button can disable itself until then.
export function canSubmit(boardState: BoardState, gameState: string): boolean {
  if (boardState.phase !== "input" && gameState === "manual") return false;

  return boardState.letters.every(isRowFull);
}

export type BoardAction =
  | { type: "setLetter"; row: number; col: number; value: string }
  | { type: "clearLetter"; row: number; col: number }
  // 'submit' carries the freshly drawn solution (chosen outside the reducer so
  // the reducer stays pure), checks every row, and reveals the result.
  | { type: "submit"; solution: string }
  | { type: "setSolution"; value: string }
  | { type: "reset"; tries: number; length: number };

// Reducer is the only place where tile letters and statuses change.
function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "setLetter": {
      // Copy every row so React sees a new board instead of a mutated one.
      const letters = state.letters.map((row) => [...row]);
      letters[action.row][action.col] = action.value;
      return { ...state, letters };
    }
    case "clearLetter": {
      const letters = state.letters.map((row) => [...row]);
      letters[action.row][action.col] = "";
      return { ...state, letters };
    }
    case "submit": {
      // Guard here too, so the rule holds no matter who dispatches it.

      // Every row is full at this point, so check them all against the
      // drawn solution and store it for the reveal.
      const statuses = state.letters.map((row) =>
        checkGuess(row, action.solution),
      );
      return { ...state, statuses, solution: action.solution, phase: "result" };
    }
    case "setSolution":
      return { ...state, solution: action.value.toUpperCase() };
    case "reset":
      // Wipe letters/statuses, drop the solution, unlock the board.
      return {
        letters: createEmptyLetters(action.tries, action.length),
        statuses: createEmptyStatuses(action.tries, action.length),
        solution: null,
        phase: "input",
      };
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// 2) Position reducer: which tile the cursor is on.
//    Moves that can wrap need to know the grid size, so the size is passed
//    in on the action payload (a reducer is pure and can't read a context).
// ---------------------------------------------------------------------------
export type Position = { row: number; col: number };

const initialPosition: Position = { row: 0, col: 0 };

export type PositionAction =
  | { type: "set"; row: number; col: number }
  | { type: "moveLeft"; length: number }
  | { type: "moveRight"; length: number; tries: number }
  | { type: "moveUp" }
  | { type: "moveDown"; tries: number }
  | { type: "reset" };

function positionReducer(state: Position, action: PositionAction): Position {
  switch (action.type) {
    case "set":
      return { row: action.row, col: action.col };
    case "moveLeft":
      if (state.col > 0) return { ...state, col: state.col - 1 };
      if (state.row > 0) return { row: state.row - 1, col: action.length - 1 };
      return state;
    case "moveRight":
      if (state.col < action.length - 1)
        return { ...state, col: state.col + 1 };
      if (state.row < action.tries - 1) return { row: state.row + 1, col: 0 };
      return state;
    case "moveUp":
      return state.row > 0 ? { ...state, row: state.row - 1 } : state;
    case "moveDown":
      return state.row < action.tries - 1
        ? { ...state, row: state.row + 1 }
        : state;
    case "reset":
      return initialPosition;
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Context + provider
// ---------------------------------------------------------------------------
type BoardContextType = {
  board: BoardState;
  boardDispatch: Dispatch<BoardAction>;
  position: Position;
  positionDispatch: Dispatch<PositionAction>;
  // High-level game actions. Both the keyboard (Board) and the button
  // (Actions) call these, so word-drawing and resets live in one place.
  submit: () => void;
  reset: () => void;
  multipliers: (number | null)[][];
  finalMultiplier: number;
  isSpinning: boolean;
  setIsSpinning: Dispatch<SetStateAction<boolean>>;
};

const BoardContext = createContext<BoardContextType | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
  // HERE is how data flows from one context to another: BoardProvider is
  // rendered INSIDE GameSettingProvider, so it can consume useGameSettings()
  // and read the board size (length/tries) chosen by the sliders.
  const { gameState } = useGameSettings();
  const [finalMultiplier, setFinalMultiplier] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // The size is used to build the initial board (lazy init, third arg).
  const [board, boardDispatch] = useReducer(
    boardReducer,
    { tries: gameState.tries, length: gameState.length },
    (size): BoardState => ({
      letters: createEmptyLetters(size.tries, size.length),
      statuses: createEmptyStatuses(size.tries, size.length),
      solution: null,
      phase: "input",
    }),
  );
  const [position, positionDispatch] = useReducer(
    positionReducer,
    initialPosition,
  );

  // Remembers the last drawn word so a new game does not repeat it. Lives in
  // a ref (not state) because it must survive resets and is not rendered.
  const lastWordRef = useRef<string | null>(null);

  // When the settings context changes the grid size, rebuild here and start
  // from the first tile. The size is passed into the reducer via the action.
  useEffect(() => {
    boardDispatch({
      type: "reset",
      tries: gameState.tries,
      length: gameState.length,
    });
    positionDispatch({ type: "reset" });
  }, [gameState.tries, gameState.length]);

  const multipliers = useMemo(
    () => computeTileMultipliers(board.letters, length),
    [board.letters, length],
  );

  // Recompute the final multiplier once the reducer has produced the new
  // statuses. Reading board.statuses right after dispatch would be stale, so
  // we react to it here instead.
  useEffect(() => {
    if (board.phase === "result") {
      const newLengthMultiplier = lengthMultiplier(gameState.length);
      const newTriesMultiplier = triesMultiplier(gameState.tries);
      const lettersMultiplier = finalMultiplierCalc(
        board.statuses,
        multipliers,
      );
      setFinalMultiplier(
        Number(
          (
            newLengthMultiplier *
            newTriesMultiplier *
            lettersMultiplier
          ).toFixed(2),
        ),
      );
    }

    return () => {
      setFinalMultiplier(0);
    };
  }, [board.phase, board.statuses, multipliers]);

  // Draw the secret word at submit time (not before), then reveal the result.
  function submit() {
    if (!canSubmit(board, gameState.mode) || gameState.stake === 0) return;
    const word = pickWord(gameState.length, lastWordRef.current);
    lastWordRef.current = word;
    boardDispatch({ type: "submit", solution: word });
  }

  // Clear the board back to a fresh, editable game.
  function reset() {
    boardDispatch({
      type: "reset",
      tries: gameState.tries,
      length: gameState.length,
    });
    positionDispatch({ type: "reset" });
    setFinalMultiplier(0);
  }

  useEffect(() => {
    let interval = undefined;

    if (isSpinning) {
      interval = setInterval(() => {
        console.log(1);
        submit();
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
    // console.log("a")

    // return () => {
    //   console.log("b")
    // }
  }, [isSpinning]);

  return (
    <BoardContext.Provider
      value={{
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
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

// Hook gives components safe access to the board context.
export function useBoard() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used inside BoardProvider");
  }

  return context;
}
