import React, { Fragment, useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { Container } from 'reactstrap'
import CardGame from './CardGame'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
  Col
} from 'reactstrap'
import CarouselGames from './Carousel'

const Game = props => {
  const { user, code, player: initPlayer, initHouse, initPlayers } = props.location.state
  const [players, setPlayers] = useState(initPlayers)
  const [house, setHouse] = useState(initHouse)
  const [player, setPlayer] = useState(initPlayer)
  useEffect(() => {
    const socket = socketIOClient('http://localhost:8082')
    socket.on('update', data => {
      setPlayers(data.players)
      setHouse(data.house)
      players.forEach(play => {
        if (play._id == player._id) {
          setPlayer(data.player)
        }
      });
    })
    socket.on('connectAPI', data => {
      console.log('connected')
      socket.emit('connected', { code, player: player._id })
    })
  }, [])

  let players_games = []
  const wins = player.wins;
  const looses = player.loses;
  


  const create_player_games = name => {
    
    for (const i in players) {
      const play = players[i]
      if (play._id == player._id) {
        players_games.push(
          <CardGame
            hand={play.hand}
            owner={play.name}
            isfromOwner={true}
          ></CardGame>
        )
      } else {
        players_games.push(
          <CardGame
            hand={play.hand}
            owner={play.name}
            isfromOwner={false}
          ></CardGame>
        )
      }
    }
  }


  //Carousel
  create_player_games()

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <h2>Username: {user}</h2>
            <h2>GameCode: {code}</h2>
          </Col>

          <Col className='text-right'>
            <h3>Wins: <span className='text-success'>{wins}</span></h3>
            <h3>Looses: <span className='text-danger'>{looses}</span></h3>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col className='col-md-auto'>
          <CardGame
              hand={house.hand}
              isfromHouse={true}
            ></CardGame>
          </Col>
          <Col className=' col-lg' > <CarouselGames player_games={players_games}></CarouselGames> </Col>
    
        </Row>
        <br/>
        <hr/>
      </Container>
    </Fragment>
  )
}

export default Game
