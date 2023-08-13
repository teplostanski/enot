/* eslint-disable @typescript-eslint/no-explicit-any */
//import React from 'react';
//import Markdown from 'react-markdown';

import { useState } from 'react';
import ConfirmDelete from '../ConfirmDelete';
import Modal from '../Modal';

interface DeleteNoteProps {
  onDeleteNote: any;
  id: any;
  text: string;
}

const DeleteNote = (props: DeleteNoteProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="button delete-button"
        onClick={() => {
          setOpen(true);
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
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default DeleteNote;
