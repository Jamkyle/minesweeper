import React, { useState, useEffect, useCallback } from "react";

import Clock from "./Clock";
import GameStatus from "../Constants/GameStatus";
import Button from "./Button";
import "../Game.css";
import { fillGrid, generateBombs, resetGrid } from "../Modules/gridUtils";
import { useGame } from "../hooks/useGameStore";

const Grid = (props) => {
  const { W, H, B } = props;
  const [completeGrid, setCompleteGrid] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [toWin, setToWin] = useState(H * W - B);
  const { gameStatus, setGameStatus } = useGame();
  let clockReset = 1;
  useEffect(() => {
    const bombsGenerated = generateBombs({ B, H, W });
    setBombs(bombsGenerated);
  }, [B, H, W]);

  useEffect(() => {
    const grid = fillGrid({ bombs, W, H });
    setCompleteGrid(grid);
  }, [bombs, W, H]);

  useEffect(() => {
    toWin < 1 && setGameStatus(GameStatus.WIN);
  }, [toWin, setGameStatus]);

  useEffect(() => {
    if (gameStatus === GameStatus.RESET) {
      setCompleteGrid(resetGrid);
      setToWin(H * W - B);
      clockReset++;
    }
  }, [gameStatus]);

  const revealCell = (x, y) => {
    setCompleteGrid((prevGrid) => {
      const newGrid = new Map(prevGrid);
      const cell = newGrid.get(`${x},${y}`);
      if (!cell || cell.isShow) return newGrid;
      if (cell.val === "B") {
        setGameStatus(GameStatus.LOOSE);
        return newGrid;
      }
      if (cell.val === "") {
        revealAdjacent(cell, newGrid);
      }
      cell.isShow = true;
      setToWin((prev) => prev - 1);
      return newGrid;
    });
  };

  const revealAdjacent = ({ x, y }, grid) => {
    const matrix = [1, 0, -1];
    matrix.forEach((dx) => {
      matrix.forEach((dy) => {
        const cell = grid.get(`${x + dx},${y + dy}`);
        if (cell && !cell.isShow) {
          revealCell(cell.x, cell.y);
        }
      });
    });
  };

  const handleAction = useCallback(({ x, y }) => {
    revealCell(x, y);
  });

  return (
    <div className="Game">
      <Clock key={"clock" + clockReset} />
      <div
        className="grid"
        style={{
          width: W * 50 + "px",
          height: H * 50 + "px",
          margin: "auto",
          background: "#eee",
        }}
      >
        {Array.from(completeGrid.values()).map(({ x, y, val, isShow }) => {
          return (
            <Button
              key={x + "," + y}
              name={val}
              isShow={isShow}
              action={() => handleAction({ x, y })}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
