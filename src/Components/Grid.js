import React, { useState, useEffect, useMemo, useContext } from 'react'

import Clock from './Clock'
import Button from './Button'
import { gameStore } from '../App'
import '../Game.css';


const Grid = (props) => {
  const { W, H, B } = props
  const [completeGrid, setCompleteGrid] = useState([]);
  const [bombs, setBombs] = useState([]);
  const [toWin, setWin] = useState(null);
  const [Cells] = useState([])
  const status = useContext(gameStore)
  const [start, setStart] = useState(false)

  useMemo(() => {
    // initialize elements bombs
    // console.log(props.status)
    let i = 0;
    let count = 0;
    const tpmBombs = [];
    while (i < (H * W) && count < (B)) {
      let x = Math.floor(Math.random() * W);
      let y = Math.floor(Math.random() * H);
      if (!JSON.stringify(tpmBombs).includes(JSON.stringify({ x: x, y: y }))) {
        tpmBombs.push({ x: x, y: y })
        count++
      }
      i++;
    }
    setBombs(tpmBombs);
    setWin(H * W - (B))
    return () => {
      setBombs([])
    }
  }, [B, H, W])

  useEffect(() => {
    fillCase();
    return () => setCompleteGrid([])
  }, []);

  useEffect(() => {
    setStart(true)
  }, [completeGrid])

  useEffect(() => {
    toWin < 1 && props.setGameState('YOU WIN');
  }, [toWin])

  useEffect(() => {
    if (status === 'restartGame') {
      resetCells();
    }
  }, [status])

  const resetCells = () => {
    for (let i = 0; i < W; i++) {
      for (let j = 0; j < H; j++) {
        Cells[`${i} ${j}`] = { ...Cells[`${i} ${j}`], isShow: false }
      }
    }
    setWin(H * W - (B))
    setStart(true)
  }

  const fillCase = () => {
    const { W, H } = props
    // console.log(bombs)
    // construct all the game plato
    // r: row of the plato, c: column of the plato
    // return an element {x, y, val} x: column; y: row; val: value element
    for (let r = 0; r < H; r++) {
      for (let c = 0; c < W; c++) {
        let count = 0;
        let val;
        let bool = !JSON.stringify(bombs).includes(JSON.stringify({ x: c, y: r }))
        if (JSON.stringify(bombs).includes(JSON.stringify({ x: c, y: r + 1 })) && bool)
          count++
        if (JSON.stringify(bombs).includes(JSON.stringify({ x: c + 1, y: r + 1 })) && bool)
          count++
        if (JSON.stringify(bombs).includes(JSON.stringify({ x: c + 1, y: r })) && bool)
          count++
        if (JSON.stringify(bombs).includes(JSON.stringify({ x: c, y: r - 1 })) && bool)
          count++
        if (JSON.stringify(bombs).includes(JSON.stringify({ x: c - 1, y: r })) && bool)
          count++
        if (JSON.stringify(bombs).includes(JSON.stringify({ x: c - 1, y: r - 1 })) && bool)
          count++
        if (JSON.stringify(bombs).includes(JSON.stringify({ x: c + 1, y: r - 1 })) && bool)
          count++
        if (JSON.stringify(bombs).includes(JSON.stringify({ x: c - 1, y: r + 1 })) && bool)
          count++
        val = bool ? count > 0 ? count : '' : 'B';
        completeGrid.push({ x: c, y: r, val });
        Cells[`${c} ${r}`] = { isShow: false, val }
      }
    }

  }

  const handleAction = async ({ x, y }) => {
    //if toWin === 0, You Win
    if (Cells[`${x} ${y}`].val !== 'B') {
      if (!Cells[`${x} ${y}`].isShow) {
        setWin(e => e - 1)
        Cells[`${x} ${y}`] = { ...Cells[`${x} ${y}`], isShow: true }
        if (Cells[`${x} ${y}`].val === '') {
          y - 1 >= 0 && handleAction({ x, y: y - 1 }) // N
          x + 1 < W && y - 1 >= 0 && handleAction({ x: x + 1, y: y - 1 }) // NE
          x + 1 < W && handleAction({ x: x + 1, y }) // E
          x + 1 < W && y + 1 < H && handleAction({ x: x + 1, y: y + 1 }) // SE
          y + 1 < H && handleAction({ x, y: y + 1 }) // S         
          x - 1 >= 0 && y + 1 < H && handleAction({ x: x - 1, y: y + 1 })// SW
          x - 1 >= 0 && handleAction({ x: x - 1, y }) //W
          x - 1 >= 0 && y - 1 >= 0 && handleAction({ x: x - 1, y: y - 1 }) // NW
        }
      }
    } else {
      props.setGameState('YOU LOOSE');
    }
  }
  return (
    <div className='Game'>
      { start && <Clock />}
      <div className='grid' style={{ width: W * 50 + 'px', height: H * 50 + 'px', margin: 'auto', background: '#eee' }}>
        {start &&
          completeGrid.map(({ x, y, val }) => {
            return <Button key={x + ',' + y} name={val} isShow={Cells[x + ' ' + y].isShow} action={() => handleAction({ x, y })} />
          })
        }
      </div>
    </div>

  )
}

export default Grid
