/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editHeight, setEditHeight] = useState<number | undefined>(10);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ref = useRef<HTMLDivElement>(null);
  //const editHei = 10 || ref.current?.getBoundingClientRect().height
  //console.log(editHei);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    return setEditHeight(ref.current?.getBoundingClientRect().height);
  }, []);

  console.log(editHeight && editHeight / 19);

  return (
    <div className="editor">
      <div className="editor__buttons">
        <button className="button" onClick={props.close}>
          Закрыть
        </button>
        <DeleteNote
          onDeleteNote={props.onDeleteNote}
          id={props.id}
          text={'Удалить'}
        />
      </div>
      <div className="editor__content">
        <div ref={ref} className="editor__edit">
          <TextareaAutosize
            minRows={editHeight && editHeight / 19 - 2}
            onHeightChange={(height) => console.log(height)}
            id="body"
            placeholder="Начните писать здесь..."
            value={props.activeNote.body}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              onEditField({ field: 'body', value: event.target.value })
            }
          />
        </div>
        {/*<div className="separator"></div>*/}
        <Preview content={props.activeNote.body} />
      </div>
    </div>
  );
};

export default Editor;
