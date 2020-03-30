import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './Game.css';
// import { Button } from './Components/Button'
import Grid from './Components/Grid'
import {EndGame} from './Components/EndGame'

class App extends Component {
  state = { status: 'inGame' }

  setGameState = (e) => {
    this.setState({ status: e })
  }
  restart = () => {
    this.setState({ status : 'inGame' })
  }

  render(){
    return (
      <div className="App">
        { this.state.status === 'inGame' && <Grid W={8} H={8} B={14} setGameState={ this.setGameState } /> }
        { this.state.status !== 'inGame' && <EndGame gameState={ this.state.status } restart={ this.restart } /> }
      </div>
    );
  }
}

export default App;
