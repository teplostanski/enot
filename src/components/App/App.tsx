/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
//import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './App.css';
import '../../index.css';
import AllNotes from '../AllNotes';
import { useEffect, useState } from 'react';

import uuid from 'react-uuid';
import Editor from '../Editor';

import { initNote } from '../../utils/constants';

type NewNote = {
  id: string;
  title: any;
  body: string;
  lastModified: number;
};

const App: React.FC = () => {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : [initNote]
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

    //if (newNote.title == '') {
    //  newNote.title = new Date().toLocaleDateString();
    //}
  };

  const onDeleteNote = (noteId: any) => {
    setNotes(notes.filter(({ id }: { id: any }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote: any) => {
    //console.log(`updatedNote${JSON.stringify(updatedNote)}`);

    const updatedNotesArr = notes.map((note: any) => {
      //console.log(`note${JSON.stringify(note)}`);
      if (note.id === updatedNote.id) {
        return updatedNote;
      }

      const getTitle = () => {
        const patern = /\#(.+?)(?:\n|$)/;
        const result = updatedNote.body.match(patern);
        if (result) {
          updatedNote.title = result?.[1];
        } else {
          updatedNote.title = `${new Date().toLocaleDateString()} - ${new Date()
            .toLocaleTimeString()
            .slice(0, -3)}`;
        }
      };

      getTitle();
      return note;
    });

    setNotes(updatedNotesArr);
    //console.log(`updatedNotesArr${JSON.stringify(updatedNotesArr)}`);
  };

  const getActiveNote = () => {
    const res = notes.find(({ id }: { id: any }) => id === activeNote);
    //console.log(typeof res);

    return res;
  };

  return (
    <div className="app">
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
          <Editor
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
