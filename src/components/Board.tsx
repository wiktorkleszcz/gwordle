import { useGameSettings } from "#/store/GameSettingContext";
import Row from "./Row";

export default function Board() {
    const {gameState} = useGameSettings();
    return (
        <div className="w-240 h-240 bg-stone-800 rounded-xl flex flex-col gap-2 justify-center items-center">
            {Array.from({ length: gameState.tries }).map((_, i) => (
                <Row key={i} wordLength={gameState.length} />
            ))}
        </div>
    )
}