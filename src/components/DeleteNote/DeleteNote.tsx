import { useState } from 'react'
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete'
import Modal from '../Modal/Modal'
import { TDeleteNoteProps } from '../../types'

const DeleteNote = (props: TDeleteNoteProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        className='button delete-button'
        onClick={() => {
          setOpen(true)
        }}
      >
        {props.text}
      </button>

      <Modal open={open} setOpen={setOpen}>
        <ConfirmDelete
          onDeleteNote={() => props.onDeleteNote(props.id)}
          yes={'Да'}
          no={'Нет'}
          setOpen={() => {
            setOpen(false)
          }}
        />
      </Modal>
    </>
  )
}

export default DeleteNote
