/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import TextareaAutosize from 'react-textarea-autosize';
import DeleteNote from '../DeleteNote';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';
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
        <DeleteNote onDeleteNote={props.onDeleteNote} id={props.id} />
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

        <Markdown
          remarkPlugins={[remarkGfm]}
          children={props.activeNote.body}
          className="editor__preview"
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={dracula}
                  language={match[1]}
                  PreTag="div"
                  showLineNumbers={true}
                  customStyle={{
                    borderRadius: '0',
                    backgroundColor: '#24292e',
                  }}
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
