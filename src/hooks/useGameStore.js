import { createContext, useContext, useState } from "react";
import GameStatus from "../Constants/GameStatus";

export const GameStore = createContext(null);
const initialGameState = {
  width: 8,
  height: 8,
  bombs: 8,
};
export function useGame() {
  return useContext(GameStore);
}

export function GameProvider({ children }) {
  const [gameConfig, setGameConfig] = useState(initialGameState);
  const [gameStatus, setGameStatus] = useState(GameStatus.INIT);
  return (
    <GameStore.Provider
      value={{ gameStatus, setGameStatus, gameConfig, setGameConfig }}
    >
      {children}
    </GameStore.Provider>
  );
}
