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
  Row,Col
} from 'reactstrap'

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
  var players_games = []

  var create_player_games = name => {
    var players = [
      {
        hand: [37, 41],
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
      }
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
              isfromOwner={false}
            ></CardGame>
          )
        }
      }
    }
    return
  }

  //Carousel
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const next = () => {
    if (animating) return
    const nextIndex =
      activeIndex === players_games.length - 1 ? 0 : activeIndex + 1
    setActiveIndex(nextIndex)
  }

  const previous = () => {
    if (animating) return
    const nextIndex =
      activeIndex === 0 ? players_games.length - 1 : activeIndex - 1
    setActiveIndex(nextIndex)
  }

  const goToIndex = newIndex => {
    if (animating) return
    setActiveIndex(newIndex)
  }

  const slides = players_games.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={players_games.indexOf(item).toString()}
      >
        {item}
        <CarouselCaption captionText='asdasdas' captionHeader='aasdasdasd' />
      </CarouselItem>
    )
  })

  create_player_games()
  return (
    <Fragment>
      <h1>Username: {user}</h1>
      <h1>GameCode: {code}</h1>

      <Container>
        <Row >
        <Col className='mx-auto text-center'>
          TODO HOUSE GAME
          </Col></Row>
        <Row>{players_games}</Row>
      </Container>
    </Fragment>
  )
}

export default Game
