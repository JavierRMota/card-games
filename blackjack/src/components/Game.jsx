import React, { Fragment, useState, useEffect, useRef} from 'react'
import socketIOClient from 'socket.io-client'
import { Container } from 'reactstrap'
import CardGame from './CardGame'
import ModalForm from './Modal'

import {
  Row,
  Col
} from 'reactstrap'
import CarouselGames from './Carousel'
import axios from 'axios'

const Game = props => {
  const { user, code, player: initPlayer, initHouse, initPlayers } = props.location.state
  const [players, setPlayers] = useState(initPlayers)
  const [house, setHouse] = useState(initHouse)
  const [player, setPlayer] = useState(initPlayer)
  const [game_state, setGameState] = useState()
  const ref = useRef(null);

  const handleScoresEvent = (type,title) => {
    ref.current.toggleModal()
    ref.current.changeType(type,title)
  }
  useEffect(() => {
    const socket = socketIOClient('http://localhost:8082')
    socket.on('update', data => {
      setPlayers(data.players)
      setHouse(data.house)
      setGameState(data.state)
      if(data.state!= null) {
        if(data.state === 'SCORES'){
          handleScoresEvent('show-scores', 'Scores')
        }
      }
      console.log(game_state);
      players.forEach(play => {
        if (play._id === player._id) {
          setPlayer(play)
        }
      });
    })
    socket.on('connectAPI', data => {
      console.log('connected')
      socket.emit('connected', { code, player: player._id })
    })
  }, )


  

  const players_games = []

  const create_player_games = name => {
    for (const i in players) {
      const play = players[i]
      if (play._id === player._id) {
        players_games.push(
          <CardGame
            points={play.points}
            hand={play.hand}
            owner={play.name}
            isfromOwner={true}
            putReady={async ()=>{
              await axios.put('http://localhost:8081/game/putPlayerReady',{
                code,
                id: player._id
              })
            }}
            newCard={async ()=>{
              await axios.put('http://localhost:8081/game/getCard',{
                code,
                id: player._id
              })
            }}
          ></CardGame>
        )
      } else {
        players_games.push(
          <CardGame
            points={play.points}
            hand={play.hand}
            owner={play.name}
            isfromOwner={false}
          ></CardGame>
        )
      }
    }
  }

  create_player_games()

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <h2>Username: {user}</h2>
            <h2>GameCode: {code}</h2>
          </Col>

         
        </Row>
        <hr/>
        <Row>
          <Col className='col-xs col-md-auto'>
          <CardGame
              hand={house.hand}
              isfromHouse={true}
            ></CardGame>
          </Col>
          <Col className='col-lg  d-none d-lg-block'  > <CarouselGames player_games={players_games}></CarouselGames> </Col>
        </Row>
        <br/>
        <Row>
          
          <Col className='col d-lg-none'  > <CarouselGames player_games={players_games}></CarouselGames> </Col>

        </Row>
        
        <br/>
        <hr/>
      </Container>
      <ModalForm ref={ref} players={players} house={house}>
      </ModalForm>
    </Fragment>
  )
}

export default Game
