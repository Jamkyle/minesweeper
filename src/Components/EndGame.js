import React from 'react'

export const EndGame = (props) => {
  return (<div className='EndGame'>
            <span>{ props.gameState }</span>
            <div onClick={ () => props.setStart('initGame') } style={{cursor : 'pointer'}}> New Game </div>
            <div onClick={() => props.setStart('restartGame') } style={{cursor : 'pointer'}}> RESTART </div>
          </div>)
}
