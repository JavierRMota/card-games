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
  const { user, code, player } = props.location.state
  useEffect(() => {
    const socket = socketIOClient('http://localhost:8082')
    socket.on('update', data => {
      // TODO: Implement update
      console.log(data)
    })
    socket.on('connectAPI', data => {
      console.log('connected')
      socket.emit('connected', { code, player: player._id })
    })
  }, [])

  console.log(player)

  var { hand, name } = player
  let players_games = []
  let wins = 23;
  let looses = 2;
  


  var create_player_games = name => {
    
    //DELETE THIS WHEN IMPLEMENTED BACKENDLOGIC
    var players = [
      {
        hand: [37, 41,30, 41,30,],
        _id: '5edd43fd9ff7662300eb4ed4',
        name: 'Test1',
        lose: false,
        win: false,
        ready: false,
        wins: 0
      },
      {
        hand: [22, 49],
        _id: '5edd43fd9ff7662300eb4ed5',
        name: 'Wakanda',
        lose: false,
        win: false,
        ready: false,
        wins: 0
      },{
        hand: [22, 49],
        _id: '5edd43fd9ff7662300eb4ed5',
        name: 'Firulais',
        lose: false,
        win: false,
        ready: false,
        wins: 0
      },
      {
        hand: [22, 49],
        _id: '5edd43fd9ff7662300eb4ed5',
        name: 'Firulais',
        lose: false,
        win: false,
        ready: false,
        wins: 0
      },
      {
        hand: [22, 49],
        _id: '5edd43fd9ff7662300eb4ed5',
        name: 'Firulais',
        lose: false,
        win: false,
        ready: false,
        wins: 0
      },
      
      
    ]

    console.log(players)
    for (const play in players) {
      if (players.hasOwnProperty(play)) {
        const element = players[play]
        if (element.name === user) {
          console.log(element.name)
          players_games.push(
            <CardGame
              hand={element.hand}
              owner={element.name}
              isfromOwner={true}
            ></CardGame>
          )
        } else {
          players_games.push(
            <CardGame
              hand={element.hand}
              owner={element.name}
            ></CardGame>
          )
        }
      }
    }
    return
  }


  //DELETE THIS WHEN IMPLEMENTED BACKENDLOGIC
  let house = {
    hand: [22, 11, 1],
    _id: '5edd43fd9ff7662300eb4ed5',
    name: 'Wakanda',
    lose: false,
    win: false,
    ready: false,
    wins: 0
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
