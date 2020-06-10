import React from 'react'
import { Button, Row, Col } from 'reactstrap'
import { useHistory } from 'react-router-dom'

const Scores = ({ players, house }) => {
  const history = useHistory()

  const goHome = () =>
    history.push({
      pathname: '/'
    })
  const setTextColor = (win, points) => {
    if (win) {
      return <span className='text-success'>{points}</span>
    } else {
      return <span className='text-danger'>{points}</span>
    }
  }
  let render_scores = [];
  if(players!= null) {
    for (let index = 0; index < players.length; index++) {
        const element = players[index]
        const { name, points, win } = element
        render_scores.push(
          <Row>
            <Col>
              <h3>
                {name}: {setTextColor(win, points)}
              </h3>
            </Col>
          </Row>
        )
      }
  }
  if(house!=null){
    render_scores.push(
        <Row>
          <Col>
            <h3>House: {house.points}</h3>
          </Col>
        </Row>
      )
    
  }

  
  return (
    <Col>
      {render_scores}
      <Button color='primary' onClick={goHome}>
        Return Home
      </Button>
    </Col>
  )
}

export default Scores
