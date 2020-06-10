import React, { useState } from 'react'
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'

import pica from '../assets/pica.png'
import diamante from '../assets/diamante.png'
import trebol from '../assets/trebol.png'
import corazon from '../assets/corazon.png'
import back from '../assets/back.png'

const PICA = 0
const DIAMANTE = 1
const TREBOL = 2
const CORAZON = 3
const VALUES = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K'
]
const DeckCard = ({
  number,
  hidden,
  owner,
  style,
  width = window.innerWidth
}) => {
  const [isHidden, setHidden] = useState(hidden)
  const deck = isHidden ? -1 : Math.floor((number % 52) / 13)
  const value = number % 13
  let image
  switch (deck) {
    case PICA:
      image = pica
      break
    case CORAZON:
      image = corazon
      break
    case TREBOL:
      image = trebol
      break
    case DIAMANTE:
      image = diamante
      break
    default:
      image = back
  }
  function createWidthOfCard (value_width) {
    let unit
    if (value_width > 1920) {
      unit = 4 / 4096
    } else {
      unit = 4 / (1920 - 300)
    }
    let value = (10 + unit * width).toString() + 'rem'
    return value
  }

  function createCardStyle (width_value) {
    let local_style = {
      width: width_value,
      height: 'auto',
      border: '.38rem solid black',
      borderRadius: '21px'
    }
    return local_style
  }

  return (
    <div onClick={() => owner && setHidden(!isHidden)} style={style}>
      <Card
        className='text-black'
        style={createCardStyle(createWidthOfCard(width))}
        despues
        de
        Card
      >
        <CardImg
          src={image}
          alt={`card ${VALUES[value]}`}
          style={{ zIndex: 0 }}
        />
        <CardImgOverlay>
          <CardTitle>
            <h5>{isHidden ? '' : VALUES[value]}</h5>
          </CardTitle>
        </CardImgOverlay>
      </Card>
    </div>
  )
}
export default DeckCard
