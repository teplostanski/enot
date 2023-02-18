interface AllNotesProps {
  onAddNote: any;
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
    <div className="main">
      <div className="main__header">
        <button className="button" onClick={props.onAddNote}>Создать</button>
      </div>
      <div className="main__notes">
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
              className={`main__note ${
                id === props.activeNote && 'active'
              }`}
              onClick={() => props.setActiveNote(id)}
              key={id}
            >
              <div className="main__note_title">
                <strong>{title}</strong>
                <button className="button" onClick={() => props.onDeleteNote(id)}>Удалить</button>
              </div>

              <p className="main__note_body">{body}</p>
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
