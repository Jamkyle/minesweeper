import React from 'react'

export const EndGame = (props) => {
  return (<div className='EndGame'>
            <span>{ props.gameState }</span>
            <div onClick={ props.restart } style={{cursor : 'pointer'}}> RESTART </div>
          </div>)
}
