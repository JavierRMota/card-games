import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import pica from '../assets/pica.png'
import diamante from '../assets/diamante.png'
import trebol  from '../assets/trebol.png'
import corazon from '../assets/corazon.png'
import back from '../assets/back.png'

const PICA = 0;
const DIAMANTE = 1;
const TREBOL = 2;
const CORAZON = 3;
const VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const DeckCard = ({ number, hidden, owner }) => {
    const [isHidden, setHidden] = useState(hidden);
    const deck = isHidden ? -1 : Math.floor((number % 52) / 13);
    const value = number % 13;
    let image;
    switch (deck) {
        case PICA:
            image = pica;
            break;
        case CORAZON: 
            image = corazon;
            break;
        case TREBOL:
            image = trebol;
            break;
        case DIAMANTE:
            image = diamante;
            break;
        default:
            image = back;
    }
    return (
        <div onClick={() => owner && setHidden(!isHidden)}>
            <Card  className="text-black"  style={{ width: '18rem', height: 'auto' }}>
                <Card.Img src={image} alt={`card ${VALUES[value]}`} />
                <Card.ImgOverlay>
                    <Card.Title >{isHidden ? '' :  VALUES[value]}</Card.Title>
                </Card.ImgOverlay>
            </Card>
        </div>
    );
}
export default DeckCard;