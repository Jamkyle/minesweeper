import React, { useEffect, useState } from 'react'

export const EndGame = (props) => {
  const [show, setShow] = useState('')
  useEffect(() => {
    let timeout = setTimeout(() => setShow('show'), 200);
    return () => clearTimeout(timeout)
  }, [])
  return (<div className={`EndGame ${show}`}>
    <span>{props.gameState}</span>
    <div className='Menu-End'>
      <div className='button-menu' onClick={() => props.setStart('initGame')} style={{ cursor: 'pointer' }}> New Game </div>
      <div className='button-menu' onClick={() => props.setStart('restartGame')} style={{ cursor: 'pointer' }}> RESTART </div>
    </div>
  </div>)
}
