/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import TextareaAutosize from 'react-textarea-autosize'
import useRerender from '../../hooks/useRerender'
import DeleteNote from '../DeleteNote/DeleteNote'
import Preview from '../MarkdownPreview/MarkdownPreview'
import { toggleObjectValue } from '../../utils'
import { IToggleObjectValue, TEditorProps } from '../../types'
import './Editor.scss'

const Editor = (props: TEditorProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [view, setView] = useState<IToggleObjectValue>({
    live: true,
    edit: false,
    preview: false,
  })

  const [editHeight, setEditHeight] = useState<number | undefined>(10)

  const { windowHeight, windowWidth, scroll } = useRerender()

  /**
   * Присваевается функция toggleObjectValue
   * с замыканием на объекте стейта view.
   * Мутирует замыкаемый объект напрямую,
   * не возвращая новый объект
   */
  const toggleViewValue = toggleObjectValue(view)

  const handleView = (value: string) => {
    toggleViewValue(value)

    /**
     * Разворачивает объект для ре-рендера
     */
    setView({ ...view })
  }

  const onEditField = ({ field, value }: { field: string; value: any }) => {
    props.onUpdateNote({
      ...props.activeNote,
      [field]: value,

      lastModified: Date.now(),
    })
  }

  useEffect(() => {
    /**
     * Если элемент не undefined, получает его высоту
     */
    if (ref.current) {
      return setEditHeight(ref.current.getBoundingClientRect().height)
    }
  }, [])

  useEffect(() => {
    /**
     * Если ширина экрана меньше 724px включить режим просмотра 'preview'
     */
    if (document.body.clientWidth < 724) {
      handleView('preview')
    }
  }, [windowHeight, windowWidth, scroll])

  return (
    <div className='editor'>
      <div className='editor__buttons'>
        <button className='button' onClick={props.close}>
          Закрыть
        </button>
        <DeleteNote onDeleteNote={props.onDeleteNote} id={props.id} text={'Удалить'} />
        <button className='button' onClick={() => handleView('edit')}>
          Edit
        </button>
        <button className='button' onClick={() => handleView('preview')}>
          Preview
        </button>
        <button className='button' onClick={() => handleView('live')}>
          Live
        </button>
      </div>
      <div className='editor__content'>
        {view.live || view.edit ? (
          <div ref={ref} className={view.edit ? cn('editor__edit_only', 'editor__edit') : 'editor__edit'}>
            <TextareaAutosize
              minRows={editHeight && editHeight / 19 - 2}
              id='body'
              placeholder='Начните писать здесь...'
              value={props.activeNote.body}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onEditField({ field: 'body', value: event.target.value })}
            />
          </div>
        ) : null}

        {view.live || view.preview ? <Preview className={view.preview ? cn('editor__preview_only', 'editor__preview') : 'editor__preview'} content={props.activeNote.body} /> : null}
      </div>
    </div>
  )
}

export default Editor
