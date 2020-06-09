import React from 'react'
import { Row, Col, Button, Card, CardBody ,CardTitle, Container} from 'reactstrap'
import CardDeck from './Card'

const CardGame = ({ hand, isfromOwner=false, owner=null, isfromHouse=false }) => {
  let player_cards = []
  var styles = []
  let width = 275;
  let height = 400;

  for (let index = 0; index < hand.length; index++) {

    let top_value = (index*40).toString()+'px';
    let left_value = (index*40).toString()+'px';
    styles.push({zIndex:index, top: top_value, left: left_value, position:'absolute'})

    width = 275 +(index*40);
    height = 400 +(index*40);
  }

  for (let index = 0; index < hand.length; index++) {
    player_cards.push(
      <CardDeck number={hand[index]} owner={owner} hidden={false} style={styles[index]}></CardDeck>
    )
  }
  let headers;
  let buttons;
  if (isfromOwner) {
    headers = (<Row>
      <Col className='mx-auto text-center'>
        <h3>Your Game</h3>
      </Col>
    </Row>)
    buttons = (
      <Row>
        <Col className='mx-auto text-center'>
          <Button color='primary' size="lg" block>Hit</Button>{' '}
          <Button color='secondary' size="lg" block>Stand</Button>{' '}
        </Col>
        
      </Row>
      
    )
  } else if(isfromHouse) {
    headers = (<Row>
      <Col className='mx-auto text-center'>
        <h3>House Game</h3>
      </Col>
    </Row>)
    buttons = (<Row></Row>)
  } else {
    headers = (<Row>
      <Col className='mx-auto text-center'>
        <h3>{owner}</h3>
      </Col>
    </Row>)
    buttons = (
      <Row>
        <Col className='mx-auto text-center'><h4 className='text-light'><i>Another player game</i></h4></Col>
      </Row>
    )
  }

  let width_str = width.toString() +'px';
  let heigth_str = height.toString() + 'px';


  return (
    <Card className='mx-auto' style={{backgroundColor:'ForestGreen', borderRadius:'21px' }}>
      <CardBody>
        <CardTitle>{headers}</CardTitle>
        <Row style={{position: 'relative',  width:width_str, height:heigth_str}}>
          <Col><Container> {player_cards}</Container></Col>
        </Row>
        
        <br/>
        <Row>
          <Col >{buttons}</Col>
        </Row>
        <br/>
      </CardBody>
    </Card>
  )
}

export default CardGame
