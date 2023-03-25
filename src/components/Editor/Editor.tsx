/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import DeleteNote from '../DeleteNote';
import Preview from '../MarkdownPreview/MarkdownPreview';
import './Editor.css';

interface EditorProps {
  activeNote: any;
  onUpdateNote: any;
  close: any;
  onDeleteNote: any;
  id: string;
}

const Editor = (props: EditorProps) => {
  const onEditField = ({ field, value }: { field: string; value: any }) => {
    props.onUpdateNote({
      ...props.activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!props.activeNote) return null;

  return (
    <div className="editor">
      <div className="editor__buttons">
        <button className="button" onClick={props.close}>
          Закрыть
        </button>
        <DeleteNote onDeleteNote={props.onDeleteNote} id={props.id} text={'Удалить'} />
      </div>
      <div className="editor__content">
        <TextareaAutosize
          id="body"
          className="editor__edit"
          placeholder="Начните писать здесь..."
          value={props.activeNote.body}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            onEditField({ field: 'body', value: event.target.value })
          }
        />
        <div className="separator"></div>
        <Preview content={props.activeNote.body} />
      </div>
    </div>
  );
};

export default Editor;
