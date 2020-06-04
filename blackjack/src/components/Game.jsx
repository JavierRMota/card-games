import React, { Fragment } from 'react'

const Game = props => {
  const { user, code, player } = props.location.state
  console.log(player)
  return <Fragment>
      <h1>Username: {user}</h1>
      <h1>GameCode: {code}</h1>
  </Fragment>
}

export default Game
