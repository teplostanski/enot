/* eslint-disable @typescript-eslint/no-explicit-any */

import { TConfirmDeleteProps } from '../../types'
import './ConfirmDelete.scss'

const ConfirmDelete = (props: TConfirmDeleteProps) => {
  return (
    <div className='confirm-delete'>
      <strong>Удалить заметку?</strong>
      <div className='confirm-delete__buttons'>
        <button className='button delete-button' onClick={props.onDeleteNote}>
          {props.yes}
        </button>
        <button className='button' onClick={props.setOpen}>
          {props.no}
        </button>
      </div>
    </div>
  )
}

export default ConfirmDelete
