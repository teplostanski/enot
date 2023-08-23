import { TModalProps } from '../../types'
import './Modal.scss'

const Modal = (props: TModalProps) => {
  return (
    <div className={props.open ? 'modal activ' : 'modal'} onClick={() => props.setOpen(false)}>
      <div className={props.open ? 'modal__container activ' : 'modal__container'} onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal
