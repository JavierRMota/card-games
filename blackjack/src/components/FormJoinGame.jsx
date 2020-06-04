import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const FormJoinGame = () => {
  const history = useHistory()

  const [user, updateUser] = useState('')
  const [code, updateCode] = useState('')

  const joinGame = async () => {
    //TODO
    try {
      console.log('Creating game')
      const response = await axios.put('http://localhost:8081/game/addPlayer',{
        name: user,
        code
      })
      const { player, code: gameCode } = response.data
      history.push({
        pathname: '/game',
        state: { user: player.name, code: gameCode, player }
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
        <Label for='gamecode'>Game Code</Label>
        <Input
          type='text'
          name='gamecode'
          id='gamecode'
          placeholder='Game Code'
          onChange={(e) => updateCode(e.target.value)}
          value={code}
        ></Input>
      </FormGroup>
      <Button color='primary' onClick={joinGame}>
        Join
      </Button>
    </Form>
  )
}

export default FormJoinGame
