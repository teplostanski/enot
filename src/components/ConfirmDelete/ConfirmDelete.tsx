/* eslint-disable @typescript-eslint/no-explicit-any */
import './ConfirmDelete.css';

interface ConfirmDeleteProps {
  setOpen: any;
  yes: string;
  no: string;
  onDeleteNote: any;
}

const ConfirmDelete = (props: ConfirmDeleteProps) => {
  return (
    <div className="confirm-delete">
      <strong>Удалить заметку?</strong>
      <div className="confirm-delete__buttons">
        <button className="button delete-button" onClick={props.onDeleteNote}>
          {props.yes}
        </button>
        <button className="button" onClick={props.setOpen}>
          {props.no}
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
