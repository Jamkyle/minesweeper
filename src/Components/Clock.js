import React, { useState, useEffect } from "react";
import { useGame } from "../hooks/useGameStore";

const Clock = () => {
  const [clock, setClock] = useState(0);
  const { gameStatus } = useGame();
  let interval = null;
  useEffect(() => {
    if (
      interval === null &&
      (gameStatus === "inGame" || gameStatus === "restartGame")
    ) {
      setClock(0);
      interval = setInterval(() => {
        setClock((e) => e + 1);
      }, 1000);
    }

    if (gameStatus === "YOU LOOSE" || gameStatus === "YOU WIN") {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
      interval = null;
    };
  }, [gameStatus]);

  return (
    <div className="clock">
      {new Date(clock * 1000)
        .toTimeString()
        .split(" ")[0]
        .split(":")
        .slice(-2)
        .join(":")}
    </div>
  );
};

export default Clock;
