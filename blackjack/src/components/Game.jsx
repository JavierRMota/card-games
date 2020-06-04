import React, { Fragment } from 'react'

const Game = props => {
  const data = props.location.state

  return <Fragment>
      <h1>Username: {data.username}</h1>
      {data.gamecode ? <h1>GameCode: {data.gamecode}</h1> : <p>No hay gamecode</p>}
  </Fragment>
}

export default Game
