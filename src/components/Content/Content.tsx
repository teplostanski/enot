import React from 'react';
import Markdown from 'react-markdown';

interface ContentProps {
  activeNote: any;
  onUpdateNote: any;
  close: any;
  onDeleteNote: any;
  id: string;
}

const Content = (props: ContentProps) => {
  const onEditField = ({ field, value }: { field: string; value: any }) => {
    props.onUpdateNote({
      ...props.activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!props.activeNote) return null

  return (
    <div className="content">
      <button onClick={props.close}>CLOSE</button>
      <div className="content__note_edit">
        <input
          type="text"
          id="title"
          placeholder="Заголовок"
          value={props.activeNote.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onEditField({ field: 'title', value: event.target.value })
          }
          autoFocus
        />
        <textarea
          id="body"
          placeholder="Начните писать здесь..."
          value={props.activeNote.body}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            onEditField({ field: 'body', value: event.target.value })
          }
        />
      </div>
      <div className="content__note_preview">
        <h1 className="preview-title">{props.activeNote.title}</h1>
        <Markdown className="markdown-preview">
          {props.activeNote.body}
        </Markdown>
      </div>
    </div>
  );
};

export default Content;
