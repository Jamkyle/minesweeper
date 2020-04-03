import React, { useState, useEffect, useReducer, createContext } from 'react';
// import logo from './logo.svg';
// import { Button } from './Components/Button'
import Grid from './Components/Grid';
import { EndGame } from './Components/EndGame';

import './App.css';
import './Game.css';

const sizeReducer = (state, action) => {
  switch (action.type) {
    case 'width':
      return { ...state, width: action.value }
    case 'height':
      return { ...state, height: action.value }
    case 'bombe':
      return { ...state, bombe: action.value }
    default:
      return state
  }
}

export const gameStore = createContext({})

const App = () => {
  // state = { status: 'inGame' }
  const [status, setGameState] = useState('initGame');
  const [game, dispatch] = useReducer(sizeReducer, { width: 8, height: 8, bombe: 11 });

  // useEffect(() => {
  //   switch (status) {
  //     case 'initGame':
  //       setGameState('initGame');
  //       break;
  //     case 'restartGame':
  //       setGameState('inGame')
  //       console.log(status)
  //     default:
  //       setGameState(status)
  //   }
  // }, [status])

  const handleChange = (e) => {
    dispatch({ type: e.target.name, value: e.target.value })
  }
  const onsubmit = () => {
    setGameState('inGame')
  }

  return (
    <gameStore.Provider value={status}>
      <div className="App">
        <h1 className='title'>Minesweepers</h1>
        {status === 'initGame' &&
          <div>
            <p>choose your setting game</p>
            <input type='text' name='width' placeholder='width' value={game.width} onChange={handleChange} />
            <input type='text' name='height' placeholder='height' value={game.height} onChange={handleChange} />
            <input type='text' name='bombe' placeholder='bombe' value={game.bombe} onChange={handleChange} />
            <div className='button-menu' onClick={onsubmit} style={{ cursor: 'pointer' }} >New Game</div>
          </div>
        }
        {status !== 'initGame' && <Grid W={game.width} H={game.height} B={game.bombe} status={status} setGameState={setGameState} />}
        {(status === 'YOU LOOSE' || status === 'YOU WIN') && <EndGame gameState={status} setStart={setGameState} />}
      </div>
    </gameStore.Provider>
  );
}

export default App;
