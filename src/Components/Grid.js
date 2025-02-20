import React, { useState, useEffect, useMemo, useContext } from "react";

import Clock from "./Clock";
import GameStatus from "../Constants/GameStatus";
import Button from "./Button";
import { gameStore } from "../App";
import "../Game.css";

const Grid = (props) => {
  const { W, H, B } = props;
  const [completeGrid, setCompleteGrid] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [toWin, setWin] = useState(null);
  const [Cells] = useState([]);
  const status = useContext(gameStore);
  let clockReset = 1;
  useMemo(() => {
    // initialize elements bombs
    // console.log(props.status)

    const tpmBombs = [];
    while (tpmBombs.length < B) {
      let x = Math.floor(Math.random() * W);
      let y = Math.floor(Math.random() * H);
      if (!JSON.stringify(tpmBombs).includes(JSON.stringify({ x: x, y: y }))) {
        tpmBombs.push({ x: x, y: y });
      }
    }
    setBombs(tpmBombs);
    setWin(H * W - (B + 1));
    console.log(tpmBombs.length);
    return () => {
      setBombs([]);
    };
  }, [B, H, W]);

  useEffect(() => {
    fillCase();
    return () => setCompleteGrid([]);
  }, []);

  useEffect(() => {
    toWin < 1 && props.setGameState(GameStatus.WIN);
  }, [toWin]);

  useEffect(() => {
    if (status === GameStatus.RESET) {
      resetCells();
      clockReset++;
    }
  }, [status]);

  const resetCells = () => {
    for (let i = 0; i < W; i++) {
      for (let j = 0; j < H; j++) {
        Cells[`${i} ${j}`] = { ...Cells[`${i} ${j}`], isShow: false };
      }
    }
    setWin(H * W - B);
  };

  const fillCase = () => {
    const { W, H } = props;
    const tmpGrid = [];
    for (let r = 0; r < H; r++) {
      for (let c = 0; c < W; c++) {
        let bombsAroundCase = 0;
        let val;
        const bombString = JSON.stringify(bombs);
        let isASafeCase = !bombString.includes(JSON.stringify({ x: c, y: r }));
        if (isASafeCase) {
          for (let rX = -1; rX <= 1; rX++) {
            for (let rY = -1; rY <= 1; rY++)
              if (
                bombString.includes(JSON.stringify({ x: c + rX, y: r + rY }))
              ) {
                bombsAroundCase++;
              }
          }
        }

        val = isASafeCase ? (bombsAroundCase > 0 ? bombsAroundCase : "") : "B";
        tmpGrid.push({ x: c, y: r, val });
        Cells[`${c} ${r}`] = { isShow: false, val: val };
      }
    }
    setCompleteGrid(tmpGrid);
  };

  const handleAction = ({ x, y }) => {
    //if toWin === 0, You Win
    if (Cells[`${x} ${y}`].val !== "B") {
      if (!Cells[`${x} ${y}`].isShow) {
        setWin((e) => e - 1);
        Cells[`${x} ${y}`] = { ...Cells[`${x} ${y}`], isShow: true };
        if (Cells[`${x} ${y}`].val === "") {
          Cells[`${x} ${y - 1}`] && y - 1 >= 0 && handleAction({ x, y: y - 1 }); // N
          Cells[`${x + 1} ${y - 1}`] &&
            x + 1 < W &&
            y - 1 >= 0 &&
            handleAction({ x: x + 1, y: y - 1 }); // NE
          Cells[`${x + 1} ${y}`] && x + 1 < W && handleAction({ x: x + 1, y }); // E
          Cells[`${x + 1} ${y + 1}`] &&
            x + 1 < W &&
            y + 1 < H &&
            handleAction({ x: x + 1, y: y + 1 }); // SE
          Cells[`${x} ${y + 1}`] && y + 1 < H && handleAction({ x, y: y + 1 }); // S
          Cells[`${x - 1} ${y + 1}`] &&
            x - 1 >= 0 &&
            y + 1 < H &&
            handleAction({ x: x - 1, y: y + 1 }); // SW
          Cells[`${x - 1} ${y}`] && x - 1 >= 0 && handleAction({ x: x - 1, y }); //W
          Cells[`${x - 1} ${y - 1}`] &&
            x - 1 >= 0 &&
            y - 1 >= 0 &&
            handleAction({ x: x - 1, y: y - 1 }); // NW
        }
      }
    } else {
      Cells[`${x} ${y}`] = { ...Cells[`${x} ${y}`], isShow: true };
      props.setGameState(GameStatus.LOOSE);
    }
  };

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
        {completeGrid.map(({ x, y, val }) => {
          return (
            <Button
              key={x + "," + y}
              name={val}
              isShow={Cells[x + " " + y].isShow}
              action={() => handleAction({ x, y })}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
