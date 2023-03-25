/* eslint-disable @typescript-eslint/no-explicit-any */
import WarnMessage from '../WarnMessage';
import './AllNotes.css';

interface AllNotesProps {
  notes: any;
  onDeleteNote: any;
  activeNote: any;
  setActiveNote: any;
}

const AllNotes = (props: AllNotesProps) => {
  const sortedNotes = props.notes.sort(
    (a: any, b: any) => b.lastModified - a.lastModified
  );

  return (
    <div className="all-notes">
      <WarnMessage />
      <div className="all-notes__notes">
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
              className={`all-notes__note ${
                id === props.activeNote && 'active'
              }`}
              onClick={() => props.setActiveNote(id)}
              key={id}
            >
              <div className="all-notes__note_title">
                <strong>{title}</strong>
              </div>

              <p className="all-notes__note_body">{body}</p>
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

export default AllNotes;
