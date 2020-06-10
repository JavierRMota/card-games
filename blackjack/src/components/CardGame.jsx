import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container
} from 'reactstrap'
import CardDeck from './Card'

const CardGame = ({
  hand,
  isfromOwner = false,
  owner = null,
  isfromHouse = false,
  newCard,
  putReady,
  points
}) => {
  const [card_width, setWidth] = useState(300)

  useEffect(() => {
    window.addEventListener('resize', () => {
      let width = window.innerWidth != null ? window.innerWidth : 500
      setWidth(width)
    })
  })
  let player_cards = []
  var styles = []
  let width = 275
  let height = 400

  for (let index = 0; index < hand.length; index++) {
    let top_value = (index * 40).toString() + 'px'
    let left_value = (index * 40).toString() + 'px'
    styles.push({
      zIndex: index,
      top: top_value,
      left: left_value,
      position: 'absolute'
    })

    width = 275 + index * 40
    height = 400 + index * 40
  }

  for (let index = 0; index < hand.length; index++) {
    player_cards.push(
      <CardDeck
        key={index}
        number={hand[index]}
        owner={isfromOwner}
        hidden={index === 0}
        style={styles[index]}
        width={card_width}
      ></CardDeck>
    )
  }
  let headers
  let buttons
  if (isfromOwner) {
    headers = (
      <Row>
        <Col className='mx-auto text-center'>
          <h3>Your Game</h3>
        </Col>
      </Row>
    )
    buttons = (
      <Row>
        <Col className='mx-auto text-center'>
          <Button color='primary' size='lg' block onClick={newCard}>
            New Card
          </Button>{' '}
          <Button color='secondary' size='lg' block onClick={putReady}>
            Stand
          </Button>{' '}
        </Col>
      </Row>
    )
  } else if (isfromHouse) {
    headers = (
      <Row>
        <Col className='mx-auto text-center'>
          <h3>House Game</h3>
        </Col>
      </Row>
    )
    buttons = <Row></Row>
  } else {
    headers = (
      <Row>
        <Col className='mx-auto text-center'>
          <h3>{owner}</h3>
        </Col>
      </Row>
    )
    buttons = (
      <Row>
        <Col className='mx-auto text-center'>
          <h4 className='text-light'>
            <i>Another player game</i>
          </h4>
        </Col>
      </Row>
    )
  }

  let width_str = width.toString() + 'px'
  let heigth_str = height.toString() + 'px'

  let card_deck

  if (isfromHouse) {
    card_deck = (
      <Row
        style={{ position: 'relative', width: width_str, height: heigth_str }}
      >
        <Col>
          <Container> {player_cards}</Container>
        </Col>
      </Row>
    )
  } else {
    card_deck = (
      <div className='row d-flex justify-content-center'>
        <div
          className='col-md-4 d-flex'
          style={{
            position: 'relative',
            width: width_str,
            height: heigth_str
          }}
        >
          <Container className='container-fluid'>{player_cards}</Container>
        </div>
      </div>
    )
  }

  let inside_points

  if (points != null) {
    inside_points = (
      <Row>
        <Col style={{ textAlign: 'center' }}>
          {' '}
          <h4 ><span style={{color:'white'}} >Points: </span>{points}</h4>
        </Col>
      </Row>
    )
  }
  return (
    <Card
      className='mx-auto'
      style={{ backgroundColor: 'ForestGreen', borderRadius: '21px' }}
    >
      <CardBody>
        <CardTitle>{headers}</CardTitle>
        {card_deck}
        <br />
        {inside_points}
        <br />
        <Row>
          <Col>{buttons}</Col>
        </Row>
        <br />
      </CardBody>
    </Card>
  )
}

export default CardGame
