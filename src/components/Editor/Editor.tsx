/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import DeleteNote from '../DeleteNote';
import Preview from '../MarkdownPreview/MarkdownPreview';
import { toggleObjectValue } from '../../utils';
import { IToggleObjectValue } from '../../types';
import './Editor.css';

interface EditorProps {
  activeNote: any;
  onUpdateNote: any;
  close: any;
  onDeleteNote: any;
  id: string;
}

const Editor = (props: EditorProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [view, setView] = useState<IToggleObjectValue>({
    live: true,
    edit: false,
    preview: false,
  });
  
  const [editHeight, setEditHeight] = useState<number | undefined>(10);

  /**
   * Присваевается функция toggleObjectValue
   * с замыканием на объекте стейта view.
   * Мутирует замыкаемый объект напрямую,
   * не возвращая новый объект
   */
  const toggleViewValue = toggleObjectValue(view);

  const handleView = (value: string) => {
    toggleViewValue(value);

    /**
     * Разворачивает старый объект для ре-рендера
     */
    setView({ ...view });
  };

  const onEditField = ({ field, value }: { field: string; value: any }) => {
    props.onUpdateNote({
      ...props.activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  useEffect(() => {
    /**
     * Если элемент не undefined, получает его высоту
     */
    if (ref.current) {
      return setEditHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  //if (!props.activeNote) return null;

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
        <button className="button" onClick={() => handleView('edit')}>
          Edit
        </button>
        <button className="button" onClick={() => handleView('preview')}>
          Preview
        </button>
        <button className="button" onClick={() => handleView('live')}>
          Live
        </button>
      </div>
      <div className="editor__content">
        {view.live || view.edit ? (
          <div ref={ref} className="editor__edit">
            <TextareaAutosize
              minRows={editHeight && editHeight / 19 - 2}
              id="body"
              placeholder="Начните писать здесь..."
              value={props.activeNote.body}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                onEditField({ field: 'body', value: event.target.value })
              }
            />
          </div>
        ) : null}

        {/*<div className="separator"></div>*/}
        {view.live || view.preview ? (
          <Preview content={props.activeNote.body} />
        ) : null}
      </div>
    </div>
  );
};

export default Editor;
