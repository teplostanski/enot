/* eslint-disable @typescript-eslint/no-explicit-any */
import WarnMessage from '../WarnMessage';
import './ListNotes.css';

interface ListNotesProps {
  notes: any;
  onDeleteNote: any;
  activeNote: any;
  setActiveNote: any;
}

const ListNotes = (props: ListNotesProps) => {
  const sortedNotes = props.notes.sort(
    (a: any, b: any) => b.lastModified - a.lastModified
  );

  return (
    <div className="list-notes">
      <WarnMessage />
      <div className="list-notes__items">
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
            <div
              className={`list-notes__item ${
                id === props.activeNote && 'active'
              }`}
              onClick={() => props.setActiveNote(id)}
              key={id}
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
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ListNotes;
