import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useCallback,
} from "react";
// import logo from './logo.svg';
// import { Button } from './Components/Button'
import Grid from "./Components/Grid";
import { EndGame } from "./Components/EndGame";
import GAMESTATUS from "./Constants/GameStatus";

import "./App.css";
import "./Game.css";

const sizeReducer = (state, action) => {
  switch (action.type) {
    case "width":
      const width = action.value > 50 ? 50 : action.value;
      return { ...state, width };
    case "height":
      const height = action.value > 50 ? 50 : action.value;
      return { ...state, height };
    case "bombe":
      let bombe =
        action.value >= state.width * state.height
          ? state.width * state.height - 1
          : action.value <= 0
          ? 1
          : action.value;
      return { ...state, bombe };
    default:
      return state;
  }
};

export const gameStore = createContext({});

const App = () => {
  // state = { status: 'inGame' }
  const [status, setGameState] = useState(GAMESTATUS.INIT);
  const [game, dispatch] = useReducer(sizeReducer, {
    width: 8,
    height: 8,
    bombe: 8,
  });

  const handleChange = useCallback(
    (e) => {
      dispatch({ type: e.target.name, value: e.target.value });
    },
    [game]
  );
  const onsubmit = () => {
    setGameState("inGame");
  };

  return (
    <gameStore.Provider value={status}>
      <div className="App">
        <h1 className="title">Minesweepers</h1>
        {status === GAMESTATUS.INIT && (
          <div>
            <p>Set up your game grid</p>
            <input
              type="text"
              name="width"
              placeholder="width"
              defaultValue={game.width}
              onChange={handleChange}
            />
            <input
              type="text"
              name="height"
              placeholder="height"
              defaultValue={game.height}
              onChange={handleChange}
            />
            <input
              type="text"
              name="bombe"
              placeholder="bombe"
              onChange={handleChange}
            />
            <div
              className="button-menu"
              onClick={onsubmit}
              style={{ cursor: "pointer" }}
            >
              Let's play
            </div>
          </div>
        )}
        {status !== GAMESTATUS.INIT && (
          <Grid
            W={game.width}
            H={game.height}
            B={game.bombe}
            status={status}
            setGameState={setGameState}
          />
        )}
        {(status === GAMESTATUS.LOOSE || status === GAMESTATUS.WIN) && (
          <EndGame gameState={status} setStart={setGameState} />
        )}
      </div>
    </gameStore.Provider>
  );
};

export default App;
