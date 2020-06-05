import React, { Fragment, useState, useEffect } from 'react'
import socketIOClient from "socket.io-client";

const Game = props => {
  const { user, code, player } = props.location.state
  useEffect(() =>{
    const socket = socketIOClient('http://localhost:8082');
    socket.on('update', data => {
      // TODO: Implement update
      console.log(data);
    });
    socket.on('connectAPI', data => {
      console.log('connected')
      socket.emit('connected',{ code, player: player._id})
    })
  },[])
  console.log(player)
  return <Fragment>
      <h1>Username: {user}</h1>
      <h1>GameCode: {code}</h1>
  </Fragment>
}

export default Game
