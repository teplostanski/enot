//import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './App.css';
import '../../index.css'
import AllNotes from '../AllNotes';
import { useState } from 'react';

import uuid from 'react-uuid';

type NewNote = {
  id: string;
  title: any;
  body: string;
  lastModified: number;
};

const App: React.FC = () => {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState('');
  console.log(activeNote);

  const onAddNote = () => {
    const newNote: NewNote = {
      id: uuid(),
      title: '',
      body: '',
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
    if (newNote.id) {
      setActiveNote(newNote.id);
    }

    if (newNote.title == '') {
      newNote.title = Date.now();
    }
  };

  const onDeleteNote = (noteId: any) => {
    setNotes(notes.filter(({ id }: { id: any }) => id !== noteId));
  };

  return (
    <div className='app'>
      <Header onAddNote={undefined} />
      <AllNotes
        notes={notes}
        onDeleteNote={onDeleteNote}
        onAddNote={onAddNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Footer />
    </div>
  );
};

export default App;
