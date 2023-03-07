/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Markdown from 'react-markdown';

import './Content.css';
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/dracula';

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

  if (!props.activeNote) return null;

  return (
    <div className="content">
      <button className="button" onClick={props.close}>
        Закрыть
      </button>
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
        <Markdown
          remarkPlugins={[remarkGfm]}
          children={props.activeNote.body}
          className="markdown-preview"
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, '')}
                  style={vs}
                  language={match[1]}
                  PreTag="div"
                  showLineNumbers= {true}
                  customStyle={{borderRadius: "0", backgroundColor: "#24292e"}}
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
        {/*{}
        </Markdown>*/}
      </div>
    </div>
  );
};

export default Content;
