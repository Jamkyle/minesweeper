import React, { useState, useEffect, useContext } from 'react';
import { gameStore } from '../App'

const Clock = () => {
  const [clock, setClock] = useState(0)
  const status = useContext(gameStore)
  let interval = null
  useEffect(() => {
    if(interval === null && (status === 'inGame' || status === 'restartGame')){
      setClock(0)
      interval = setInterval(() => {
        setClock(e => e + 1)
      }, 1000);
    }

    if (status === 'YOU LOOSE' || status === 'YOU WIN'){
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [status])

  return <div className='clock'>{new Date(clock * 1000).toTimeString().split(' ')[0].split(':').slice(-2).join(':')}</div>
}

export default Clock