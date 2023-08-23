/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import WarnMessage from '../WarnMessage/WarnMessage'
import { TListNotesProps } from '../../types'
import './ListNotes.scss'

const ListNotes = (props: TListNotesProps) => {
  const navigate = useNavigate()

  const sortedNotes = props.notes.sort((a: any, b: any) => b.lastModified - a.lastModified)

  const hansdleActiveNote = (id: any) => {
    props.setActiveNote(id)
    navigate(`/note/${id}`)
  }

  return (
    <div className='list-notes'>
      <WarnMessage />
      <ul className='list-notes__items'>
        {sortedNotes.map(({ id, title, body, lastModified }: { id: string; title: string; body: any; lastModified: number }) => (
          //<>
          <li key={id} className={`list-notes__item ${id === props.activeNote && 'active'}`} onClick={() => hansdleActiveNote(id)}>
            <div className='list-notes__item_title'>
              <strong>{title}</strong>
            </div>

            <p className='list-notes__item_body'>{body}</p>
            <small className='note-meta'>
              Последние изменения{' '}
              {new Date(lastModified).toLocaleDateString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListNotes
