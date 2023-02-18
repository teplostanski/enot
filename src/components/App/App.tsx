//import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './App.css';
import '../../index.css'
import AllNotes from '../AllNotes';
import { useEffect, useState } from 'react';

import uuid from 'react-uuid';
import Content from '../Content';

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

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

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

  const onUpdateNote = (updatedNote: any) => {
    console.log(`updatedNote${JSON.stringify(updatedNote)}`);

    const updatedNotesArr = notes.map((note: any) => {
      console.log(`note${JSON.stringify(note)}`);
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });

    setNotes(updatedNotesArr);
    console.log(`updatedNotesArr${JSON.stringify(updatedNotesArr)}`);
  };

  const getActiveNote = () => {
    const res = notes.find(({ id }: { id: any }) => id === activeNote);
    console.log(typeof res);

    return res
  };

  return (
    <div className='app'>
      <Header onAddNote={onAddNote} />
      <AllNotes
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      {activeNote && (
        <>
          {/*<button onClick={() => setActiveNote('')}>CLOSE</button>*/}
          <Content
            activeNote={getActiveNote()}
            onUpdateNote={onUpdateNote}
            close={() => setActiveNote('')}
            onDeleteNote={onDeleteNote}
            id={activeNote}
          />
        </>
      )}
      <Footer />
    </div>
  );
};

export default App;
