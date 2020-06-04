import React from 'react'
import {
  CardText,
  CardBody,
  CardTitle,
  Card,
  Container,
  Row,
  Col
} from 'reactstrap'
import imagen from '../assets/imagen.png'

const Credits = () => {
  
  return (
    <Container>
      <div className='py-5 text-center'>
        <h1>21 Blackjack</h1>

        <p className='lead'>
          Blackjack, formerly also Black Jack and Vingt-Un, is the American
          member of a global family of banking games known as Twenty-One, whose
          relatives include Pontoon and Vingt-et-Un. It is a comparing card game
          between one or more players and a dealer, where each player in turn
          competes against the dealer.
        </p>
      </div>
      <Card>
        <Row className='align-items-center'>
          <CardBody>
            <Col sm='6'>
              <CardTitle>
                <h2>This project was made by:</h2>
              </CardTitle>
              <CardText>
                <ul>
                  <li>
                    {' '}
                    <a
                      href='https://github.com/JavierRMota/'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <h5> José Javier Rodríguez Mota - A01372812</h5>
                    </a>{' '}
                  </li>
                  <li>
                    {' '}
                    <a
                      href='https://github.com/RLZW'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <h5>Raúl Alejandro Fuentes - A01379695</h5>
                    </a>{' '}
                  </li>

                  <li>
                    {' '}
                    <a
                      href='https://github.com/Sleilanir'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <h5>Sonia Leilani Ramos - A1378843 </h5>
                    </a>{' '}
                  </li>
                </ul>
                <h5>
                  As a project for Web apps development class at <br></br>
                  <a
                    href='https://tec.mx/en'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {' '}
                    Instituto Tecnológico de Estudios Superiores de Monterrey
                  </a>
                </h5>
              </CardText>
            </Col>

            <img
              className='col-sm-6'
              src={imagen}
              alt=''
            ></img>
          </CardBody>
        </Row>
      </Card>
    </Container>
  )
}

export default Credits
