/* eslint-disable @typescript-eslint/no-explicit-any */
import WarnMessage from '../WarnMessage';
import './ListNotes.css';

import { useNavigate, useLocation } from 'react-router-dom';

interface ListNotesProps {
  notes: any;
  onDeleteNote: any;
  activeNote: any;
  setActiveNote: any;
}

const ListNotes = (props: ListNotesProps) => {
  
  const navigate = useNavigate()
  const loc = useLocation()
  console.log(loc);
  
  const sortedNotes = props.notes.sort(
    (a: any, b: any) => b.lastModified - a.lastModified
  );
  
  const hansdleActiveNote = (id: any) => {
    props.setActiveNote(id)
    navigate(`/note/${id}`)
  }

  return (
    <div className="list-notes">
      <WarnMessage />
      <ul className="list-notes__items">
        {sortedNotes.map(
          ({
            id,
            title,
            body,
            lastModified,
          }: {
            id: string;
            title: string;
            body: any;
            lastModified: number;
          }) => (
            //<>
              <li 
                key={id}
                className={`list-notes__item ${
                  id === props.activeNote && 'active'
                }`}
                onClick={()=>hansdleActiveNote(id)}
              >
                <div className="list-notes__item_title">
                  <strong>{title}</strong>
                </div>

                <p className="list-notes__item_body">{body}</p>
                <small className="note-meta">
                  Последние изменения{' '}
                  {new Date(lastModified).toLocaleDateString('ru-RU', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
              </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ListNotes;
