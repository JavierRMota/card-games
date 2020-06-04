import React, { useContext, useState, Fragment , useRef} from 'react'
import ModalForm from './Modal'
import {
  CardLink,
  CardText,
  CardBody,
  CardTitle,
  Card,
  Button,
  Container,
  Row,
  Col,

} from 'reactstrap'
import imagen from '../assets/imagen.png'

const Home = () => {

  const ref = useRef(null);

  const handleClick = (type,title) => {
    ref.current.toggleModal()
    ref.current.changeType(type,title)


  }
  return (
    <Fragment>
      <Container>
        <div className='py-5 text-center'>
          <h1>21 Blackjack</h1>
          <img
            className='d-block mx-auto mb-8'
            src={imagen}
            alt=''
            style={{ width: '50%' }}
          ></img>
          <p className='lead'>
            Blackjack, formerly also Black Jack and Vingt-Un, is the American
            member of a global family of banking games known as Twenty-One,
            whose relatives include Pontoon and Vingt-et-Un. It is a comparing
            card game between one or more players and a dealer, where each
            player in turn competes against the dealer.
          </p>
          <Row style={{ margin: 'auto', maxWidth: '300px' }}>
            <Col>
              <Button color='primary' onClick={() => handleClick('join-game','Join Game')}>Join Game</Button>{' '}
            </Col>
            <Col>
              <Button
                outline
                color='primary'
                onClick={() => 
                  handleClick('create-game', 'Create Game')
                }
              >
                Create Game
              </Button>{' '}
            </Col>
          </Row>
          <br />
        </div>
        <Card>
          <CardBody>
            <CardTitle>
              <h3>Rules</h3>
            </CardTitle>
            <CardText>
              <ul>
                <li>
                  {' '}
                  - The goal of blackjack is to beat the dealer's hand without
                  going over 21.
                </li>
                <li>
                  {' '}
                  - Face cards are worth 10. Aces are worth 1 or 11, whichever
                  makes a better hand.
                </li>
                <li>
                  {' '}
                  - Each player starts with two cards, one of the dealer's cards
                  is hidden until the end.
                </li>
                <li>
                  {' '}
                  - To 'Hit' is to ask for another card. To 'Stand' is to hold
                  your total and end your turn.
                </li>
                <li>
                  {' '}
                  - If you go over 21 you bust, and the dealer wins regardless
                  of the dealer's hand.
                </li>
                <li>
                  {' '}
                  - If you are dealt 21 from the start (Ace & 10), you got a
                  blackjack.
                </li>
                <li>
                  {' '}
                  - Blackjack usually means you win 1.5 the amount of your bet.
                  Depends on the casino.
                </li>
                <li>
                  {' '}
                  - Dealer will hit until his/her cards total 17 or higher.
                </li>
                <li>
                  {' '}
                  - Doubling is like a hit, only the bet is doubled and you only
                  get one more card.
                </li>
                <li>
                  {' '}
                  - Split can be done when you have two of the same card - the
                  pair is split into two hands.
                </li>
                <li>
                  {' '}
                  - Splitting also doubles the bet, because each new hand is
                  worth the original bet.
                </li>
                <li>
                  {' '}
                  - You can only double/split on the first move, or first move
                  of a hand created by a split.
                </li>
                <li> - You cannot play on two aces after they are split.</li>
                <li>
                  {' '}
                  - You can double on a hand resulting from a split, tripling or
                  quadrupling you bet.
                </li>
              </ul>
            </CardText>
            <CardLink>
              <a
                href='https://en.wikipedia.org/wiki/Blackjack'
                class='card-link float-right'
              >
                More information...
              </a>
            </CardLink>
          </CardBody>
        </Card>
      </Container>

      <ModalForm ref={ref} type="Wakanda">
      </ModalForm>
    </Fragment>
  )
}
export default Home
