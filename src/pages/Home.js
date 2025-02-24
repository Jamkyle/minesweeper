import { EndGame } from "../Components/EndGame";
import Grid from "../Components/Grid";
import GridSetup from "../Components/GridSetup";
import GameStatus from "../Constants/GameStatus";
import { useGame } from "../hooks/useGameStore";

export default function Home() {
  const { gameStatus, gameConfig } = useGame();
  return (
    <div className="App">
      <h1 className="title">Minesweepers</h1>
      <span>Set up your game grid</span>
      {gameStatus === GameStatus.INIT && <GridSetup />}
      {gameStatus !== GameStatus.INIT && (
        <Grid W={gameConfig.width} H={gameConfig.height} B={gameConfig.bombs} />
      )}
      {(gameStatus === GameStatus.LOOSE || gameStatus === GameStatus.WIN) && (
        <EndGame />
      )}
    </div>
  );
}
