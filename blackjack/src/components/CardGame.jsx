import React from 'react'
import { Row, Col, Button, Card, CardBody } from 'reactstrap'
import CardDeck from './Card'

const CardGame = ({ hand, isfromOwner, owner }) => {
  let player_cards = []

  for (const value in hand) {
    console.log(value)
    if (hand.hasOwnProperty(value)) {
      player_cards.push(
        <CardDeck number={value} owner={owner} hidden={false}></CardDeck>
      )
    }
  }
  let buttons
  if (isfromOwner) {
    buttons = (
      <Row>
        <Col className='mx-auto text-center'>
          <Button color='success'>Hit</Button>{' '}
          <Button color='secondary'>Stand</Button>{' '}
        </Col>
      </Row>
    )
  } else {
    buttons = (
      <Row>
        <Col className='mx-auto text-center'>Another player game</Col>
      </Row>
    )
  }
  return (
    <Card className='mx-auto '>
      <CardBody>
        <Row>
          <Col>{player_cards}</Col>
        </Row>
        <br/>
        <Row>
          <Col >{buttons}</Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default CardGame
