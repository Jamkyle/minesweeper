import React, { useEffect, useState } from "react";
import GAMESTATUS from "../Constants/GameStatus";
import { useGame } from "../hooks/useGameStore";

export function EndGame(props) {
  const [show, setShow] = useState("");
  const [title, setTitle] = useState("");
  const { gameStatus, setGameStatus: setStart } = useGame();

  useEffect(() => {
    let timeout = setTimeout(() => setShow("show"), 200);
    console.log("gameStatus", gameStatus);
    switch (gameStatus) {
      case GAMESTATUS.WIN:
        setTitle("Well done");
        break;
      case GAMESTATUS.LOOSE:
        setTitle("Next time you'll be better");
        break;
      case GAMESTATUS.PAUSE:
        setTitle("PAUSE");
        break;
      default:
        setTitle(gameStatus);
    }
    return () => clearTimeout(timeout);
  }, [gameStatus]);

  return (
    <div className={`EndGame ${show}`}>
      <span>{title}</span>
      <div className="Menu-End">
        <div
          className="button-menu"
          onClick={() => setStart(GAMESTATUS.RESET)}
          style={{ cursor: "pointer" }}
        >
          Try again
        </div>
        <div
          className="button-menu"
          onClick={() => setStart(GAMESTATUS.INIT)}
          style={{ cursor: "pointer" }}
        >
          New Game
        </div>
      </div>
    </div>
  );
}
