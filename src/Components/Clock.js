import React, { useState, useEffect, useContext } from 'react';
import { gameStore } from '../App'

const Clock = () => {
  const [clock, setClock] = useState(0)
  const status = useContext(gameStore)

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(e => e + 1)
    }, 1000);
    return () => clearInterval(interval)
  }, [])

  return <div className='clock'>{ new Date(clock * 1000).toTimeString().split(' ')[0].split(':').slice(-2).join(':') }</div>
}

export default Clock