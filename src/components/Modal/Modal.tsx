/* eslint-disable @typescript-eslint/no-explicit-any */
import './Modal.css';

interface ModalProps {
  open: any;
  setOpen: any;
  children: JSX.Element;
}

const Modal = (props: ModalProps) => {
  return (
    <>
      <div
        className={props.open ? 'modal activ' : 'modal'}
        onClick={() => props.setOpen(false)}
      >
        <div
          className={
            props.open ? 'modal__container activ' : 'modal__container'
          }
          onClick={(e) => e.stopPropagation()}
        >{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
