import React, { Component } from 'react'
import { Button } from './Button'
import '../Game.css';

class Grid extends Component {
  state = { completeGrid : [] }

  componentWillMount = () => {
    const { W, H, B } = this.props
    var bombs = [];
    let i = 0;
    while ( i < ( H * W ) && bombs.length < ( B ) ){
      let x = Math.floor(i%W + Math.random()*( W - i%W ))
      let y = Math.floor(i%H + Math.random()*( H - i%H ))
      // console.log(` ${JSON.stringify(bombs)} = ${JSON.stringify({x:x, y:y})} : ${JSON.stringify(bombs).includes(JSON.stringify({x:x, y:y}))}`)
      if( !JSON.stringify(bombs).includes(JSON.stringify({x:x, y:y})) )
        bombs.push({ x:x, y:y })
      i++
    }
    this.setState({ bombs })
  }

  componentDidMount(){
    this.fillCase()
    this.toWin = this.props.H * this.props.W - (this.props.B + 1)
  }

  fillCase = () => {
    const { W, H } = this.props
    const { bombs } = this.state
    const completeGrid = [];
    // construct all the game plato
    // r: row of the plato, c: column of the plato
    // return an element {x, y, val} x: column; y: row; val: value element
    for(let r = 0; r < H; r++ ){
      for(let c= 0; c < W; c++ ){
        let count=0;
        let val;
        bombs.map( (bomb, index) => {
          // console.log(bomb);
          let x = bomb.x, y = bomb.y;
          // here we check if the current element is not a bomb
          let bool = !JSON.stringify(bombs).includes(JSON.stringify({x:c, y:r}))
          // we should have a count if a bomb is near the current element and if is not a bomb
          if(r === y - 1 && c === x && bool)
            count++
          if(r === y + 1 && c === x && bool)
            count++
          if(r === y && c === x - 1 && bool)
            count++
          if(r === y && c === x + 1 && bool)
            count++
          if(r === y + 1 && c === x + 1 && bool)
            count++
          if(r === y - 1 && c === x - 1 && bool)
            count++
          if(r === y + 1 && c === x - 1 && bool)
            count++
          if(r === y - 1 && c === x + 1 && bool)
            count++
          //check if the current element is a bomb or neutral or a number
          val = bool ? count > 0 ? count : '.' : 'B'
        })
        completeGrid.push({ x:r, y:c, b: val });
      }
    }
    this.setState({ completeGrid })
  }

  handleAction = (coords) => {
    //if toWin === 0, You Win
    this.toWin -= 1
    this.toWin < 1 && this.props.setGameState('YOU WIN')
    if( this.refs[coords.x+' '+coords.y].name !== 'B' ){
      if( this.refs[coords.x+' '+coords.y].show === false && this.refs[coords.x+' '+coords.y].name === '.') {
        this.refs[coords.x+' '+coords.y].toggle()
         // parseInt(coords.x-1) > 0 && parseInt(coords.y+1) > this.props.H && parseInt(coords.y-1) < 0
        parseInt(coords.y-1) >= 0 && this.refs[parseInt(coords.x) + ' ' + parseInt(coords.y-1)].action() //N
        parseInt(coords.x+1) < this.props.W && parseInt(coords.y-1) >= 0 &&  this.refs[parseInt(coords.x+1)+' '+parseInt(coords.y-1)].action() //NE
        parseInt(coords.x+1) < this.props.W && this.refs[parseInt(coords.x+1)+' '+coords.y].action() //E
        parseInt(coords.x+1) < this.props.W && parseInt(coords.y+1) < this.props.H && this.refs[parseInt(coords.x+1)+' '+parseInt(coords.y+1)].action() // SE
        parseInt(coords.y+1) < this.props.H && this.refs[coords.x+' '+parseInt(coords.y+1)].action() //S
        parseInt(coords.x-1) >= 0 && parseInt(coords.y+1) < this.props.H && this.refs[parseInt(coords.x-1)+' '+parseInt(coords.y+1)].action() //SW
        parseInt(coords.x-1) >= 0 && this.refs[parseInt(coords.x-1)+' '+coords.y].action() //W
        parseInt(coords.x-1) >= 0 && parseInt(coords.y-1) >= 0 && this.refs[parseInt(coords.x-1)+' '+parseInt(coords.y-1)].action() //NW
      }
    } 
    else this.props.setGameState('YOU LOOSE')
  }


  render(){
    const { W, H } = this.props
      return (
        <div className='grid' style={{ width : W*50+1+'px', height : H*50+1+'px', margin: 'auto', background:'#eee' }}>
        {this.state.completeGrid.map( (items, r) => {
          console.log(items)
          return <Button key={r} ref={ items.x+' '+items.y } name={ items.b } x={items.x} y={items.y} show={ false } action={ this.handleAction } />
        })}
        </div>
    )
  }
}

export default Grid
