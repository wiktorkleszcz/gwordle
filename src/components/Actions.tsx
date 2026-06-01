import Input from "./Input";
import { STAKE_LIMITS, useGameSettings } from "#/store/GameSettingContext";
import { canSubmit, useBoard } from "#/store/BoardContext";
import { lengthMultiplier, triesMultiplier } from "#/game/multipliers";
import Slider from "./Slider";
import Multiplier from "./Multiplier";

// Actions renders the game settings panel and dispatches changes to shared game settings.
export default function Actions() {
  const { gameState, gameStateDispatch } = useGameSettings();
  const { board, submit, reset, isSpinning, setIsSpinning } = useBoard();

  // The bottom button mirrors the Enter key: it submits during input and
  // resets once the result is shown. Both triggers go through the same
  // context actions, so there is a single source of truth for the flow.
  const isResult = board.phase === "result";
  // const playLabel = isResult ? "Play again" : "Check";
  const playLabel =
    gameState.mode === "auto"
      ? isSpinning
        ? "Stop"
        : "Start"
      : isResult
        ? "Play again"
        : "Check";
  const canPlay =
    isResult || (canSubmit(board, gameState.mode) && !(gameState.stake === 0));

  function handlePlay() {
    if (isSpinning) {
      setIsSpinning(false);
      reset();
      return;
    }

    if (gameState.mode === "auto") {
      setIsSpinning(true);
      return;
    }

    if (isResult) {
      reset();
      return;
    }
    submit();
  }

  return (
    <div className="flex flex-col justify-between content-center p-6 bg-stone-800 w-80 gap-2 rounded-2xl shadow-outbox-lg">
      <h1 className="flex flex-row justify-center text-white text-3xl">
        Let's Play!
      </h1>
      <Input
        min={STAKE_LIMITS.min}
        max={STAKE_LIMITS.max}
        // Show an empty field for zero so the user does not type after a leading 0.
        value={gameState.stake === 0 ? "" : gameState.stake}
        type="number"
        desc="Stake"
        onChange={(event) =>
          gameStateDispatch({
            type: "setStake",
            value: Number(event.target.value),
          })
        }
      />
      <div className="flex flex-row gap-2">
        {/* Sliders update the board dimensions; each shows its multiplier. */}
        <div className="flex flex-col w-full">
          <Slider
            desc="Length"
            min={3}
            max={8}
            value={gameState.length}
            handleChange={(value) =>
              gameStateDispatch({ type: "setLength", value })
            }
          />
          <span className="text-white/70 text-sm">
            Mult: <Multiplier value={lengthMultiplier(gameState.length)} />
          </span>
        </div>
        <div className="flex flex-col w-full">
          <Slider
            desc="Tries"
            min={1}
            max={6}
            value={gameState.tries}
            handleChange={(value) =>
              gameStateDispatch({ type: "setTries", value })
            }
          />
          <span className="text-white/70 text-sm">
            Mult: <Multiplier value={triesMultiplier(gameState.tries)} />
          </span>
        </div>
      </div>
      <div className="flex flex-col items-between gap-2">
        <label className="text-white">Profit/Lose Graph</label>
        <div className="bg-stone-800 h-68 w-68 rounded-md flex flex-row justify-center items-center shadow-inbox-sm">
          <p className="text-white"></p>
        </div>
      </div>
      <div className="flex flex-col items-between gap-2">
        <label className="text-white">Manual/Auto</label>
        <div className="flex flex-row justify-center rounded-md shadow-outbox">
          {/* Buttons use type="button" so they do not submit a parent form. */}
          <button
            type="button"
            className={`${gameState.mode === "manual" ? "bg-green-500" : "bg-stone-800 hover:bg-stone-900"} text-white p-3 rounded-bl-md rounded-tl-md min-w-24 transition-colors w-full`}
            onClick={() =>
              gameStateDispatch({ type: "setMode", value: "manual" })
            }
          >
            Manual
          </button>
          <button
            type="button"
            className={`${gameState.mode === "auto" ? "bg-green-500" : "bg-stone-800  hover:bg-stone-900"} text-white p-3 rounded-br-md rounded-tr-md min-w-24 transition-colors w-full`}
            onClick={() =>
              gameStateDispatch({ type: "setMode", value: "auto" })
            }
          >
            Autoplay
          </button>
        </div>
      </div>
      <label className="text-white">Play</label>
      {/* Disabled in input until the board is a valid guess (full rows). */}
      <button
        type="button"
        disabled={!canPlay}
        onClick={handlePlay}
        className="text-white p-3 rounded-md min-w-24 transition-colors w-full bg-stone-800 shadow-outbox hover:shadow-inbox-pressed disabled:opacity-40 disabled:hover:shadow-outbox disabled:cursor-not-allowed"
      >
        {playLabel}
      </button>
    </div>
  );
}
