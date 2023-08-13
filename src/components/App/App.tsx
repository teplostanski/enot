/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
//import React, { useState } from 'react';
import { useEffect, useState } from 'react';
import '../../index.css';
import Header from '../Header/Header';
import ListNotes from '../ListNotes';
import './App.css';

import uuid from 'react-uuid';
import Editor from '../Editor';

import { initNote } from '../../utils/constants';
import NoNotesMessage from '../NoNotesMessage';

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
  };

  const onDeleteNote = (noteId: any) => {
    setNotes(notes.filter(({ id }: { id: any }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote: any) => {
    const updatedNotesArr = notes.map((note: any) => {
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
  };

  const getActiveNote = () => {
    const res = notes.find(({ id }: { id: any }) => id === activeNote);

    return res;
  };

  return (
    <div className="app">
      <Header onAddNote={onAddNote} />
      {notes.length !== 0 ? (
        <ListNotes
          notes={notes}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
      ) : (
        <NoNotesMessage />
      )}
      {activeNote && (
        <Editor
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
          close={() => setActiveNote('')}
          onDeleteNote={onDeleteNote}
          id={activeNote}
        />
      )}
    </div>
  );
};

export default App;
