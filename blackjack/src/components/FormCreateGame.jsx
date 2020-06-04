import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { useHistory } from 'react-router-dom'

const FormCreateGame = () => {
  const history = useHistory()

  const [data, updateData] = useState({
    username: ''
  })

  const handleChange = e => {
    updateData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const { username } = data

  const createGame = () => {
    //TODO
    console.log('Creating game')
    history.push({
      pathname: '/game',
      state: { username: username}
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
      <Button color='primary' onClick={createGame}>
        Create
      </Button>
    </Form>
  )
}

export default FormCreateGame
