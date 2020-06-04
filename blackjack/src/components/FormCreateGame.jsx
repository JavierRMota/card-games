import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const FormCreateGame = () => {
  const history = useHistory()

  const [user, updateUser] = useState('')
  const [decks, updateDecks] = useState('')

  const createGame = async () => {
    //TODO
    try {
      console.log('Creating game')
      const response = await axios.post('http://localhost:8081/games/createGame/',{
        name: user,
        decks
      })
      const { player, code } = response.data
      history.push({
        pathname: '/game',
        state: { user: player.name, code, player }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form>
      <FormGroup>
        <Label for='username'>Username</Label>
        <Input
          type='text'
          name='username'
          id='username'
          placeholder='Username'
          onChange={(e) => updateUser(e.target.value)}
          value={user}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for='decks'>Decks</Label>
        <Input
          type='number'
          name='decks'
          id='decks'
          placeholder='# of decks'
          onChange={(e) => updateDecks(e.target.value)}
          value={decks}
        ></Input>
      </FormGroup>
      <Button color='primary' onClick={createGame}>
        Create
      </Button>
    </Form>
  )
}

export default FormCreateGame
