import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import { Button } from './Components/Button'
import Grid from './Components/Grid';
import { EndGame } from './Components/EndGame';

import './App.css';
import './Game.css';

const App = () => {
  // state = { status: 'inGame' }
  const [status, setGameState] = useState('inGame');
  useEffect(()=> {
    switch( status ) {
      case 'initGame' : 
        setGameState('inGame');
        break;
      case 'restarGame' :
        setGameState('inGame')
        break;
      default :
        setGameState(status)
    }
  }, [status])

  return (
    <div className="App">
      { status !== 'initGame' && <Grid W={8} H={8} B={1} status={status} setGameState={ setGameState } />}
      { status !== 'inGame' && <EndGame gameState={ status } setStart={ setGameState } />}
    </div>
  );
}

export default App;
