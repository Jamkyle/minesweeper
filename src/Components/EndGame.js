import React, { useEffect, useState } from "react";
import GAMESTATUS from "../Constants/GameStatus";

export function EndGame(props) {
  const [show, setShow] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    let timeout = setTimeout(() => setShow("show"), 200);
    switch (props.gameState) {
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
        setTitle(props.gameState);
    }
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`EndGame ${show}`}>
      <span>{title}</span>
      <div className="Menu-End">
        <div
          className="button-menu"
          onClick={() => props.setStart(GAMESTATUS.RESET)}
          style={{ cursor: "pointer" }}
        >
          {" "}
          Try again{" "}
        </div>
        <div
          className="button-menu"
          onClick={() => props.setStart(GAMESTATUS.INIT)}
          style={{ cursor: "pointer" }}
        >
          {" "}
          New Game{" "}
        </div>
      </div>
    </div>
  );
}
