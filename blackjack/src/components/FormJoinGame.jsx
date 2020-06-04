import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'

const FormJoinGame = () => {
  const history = useHistory()
  const [data, updateData] = useState({
    username: '',
    gamecode: ''
  })

  const handleChange = e => {
    updateData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const { username, gamecode } = data

  const JoinGame = () => {
    //TODO
    console.log('Joining game')
    history.push({
      pathname: '/game',
      state: { username: username, gamecode: gamecode }
    })
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
          onChange={handleChange}
          value={username}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for='gamecode'>Game Code</Label>
        <Input
          type='text'
          name='gamecode'
          id='gamecode'
          placeholder='Game Code'
          onChange={handleChange}
          value={gamecode}
        ></Input>
      </FormGroup>
      <Button color='primary' onClick={JoinGame}>
        Create
      </Button>
    </Form>
  )
}

export default FormJoinGame
