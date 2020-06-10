import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import FormCreateGame from './FormCreateGame'
import FormJoinGame from './FormJoinGame'
import Scores from './Scores'

const ModalForm = forwardRef((props, ref, players, house) => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => setModal(!modal)

  const [data, setType] = useState({ type: '', title: '' })

  const changeType = (type, title) => {
    setType({ type: type, title: title })
  }

  useImperativeHandle(ref, () => {
    return {
      toggleModal: toggleModal,
      changeType: changeType
    }
  })

  const renderComponent = type => {
    if (data.type === 'join-game') {
      return <FormJoinGame></FormJoinGame>
    } else if (data.type === 'create-game') {
      return <FormCreateGame></FormCreateGame>
    } else if(data.type === 'show-scores'){
      return <Scores players={props.players} house={props.house}></Scores>
    } else {
      return <p>An error has ocurred</p>
    }
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{data.title}</ModalHeader>
        <ModalBody>{renderComponent()}</ModalBody>
      </Modal>
    </div>
  )
})

export default ModalForm
