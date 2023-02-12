import React from 'react';
import Markdown from 'react-markdown';

interface DeleteNoteProps {
  onDeleteNote: any;
  id: any;
}

const DeleteNote = (props: DeleteNoteProps) => {

  return (
    <button onClick={() => props.onDeleteNote(props.id)}>Удалить</button>
  );
};

export default DeleteNote;
