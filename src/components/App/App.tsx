/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
//import React, { useState } from 'react';
import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import uuid from 'react-uuid'
import useLocalStorage from '../../hooks/useLocalStorage'
import Header from '../Header/Header'
import ListNotes from '../ListNotes/ListNotes'
import Editor from '../Editor/Editor'
import { initNote } from '../../utils/constants'
import { TNewNote } from '../../types'
import './App.scss'
import '../../index.css'

const App: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [notes, setNotes] = useLocalStorage('notes', [initNote])
  const [activeNote, setActiveNote] = useLocalStorage('id', '')
  console.log(activeNote)

  useEffect(() => {
    setNotes(notes)
  }, [notes, setNotes])

  useEffect(() => {
    if (location.pathname !== `/note/${activeNote}`) {
      setActiveNote('')
    } else {
      setActiveNote(activeNote)
    }
  }, [activeNote, location.pathname, setActiveNote])

  const onAddNote = () => {
    const newNote: TNewNote = {
      id: uuid(),
      title: '',
      body: '',
      lastModified: Date.now(),
    }

    setNotes([newNote, ...notes])
    if (newNote.id) {
      setActiveNote(newNote.id)
    }

    navigate(`/note/${newNote.id}`)
  }

  const onDeleteNote = (noteId: any) => {
    setNotes(notes.filter(({ id }: { id: any }) => id !== noteId))
    navigate('/')
  }

  const onUpdateNote = (updatedNote: any) => {
    const updatedNotesArr = notes.map((note: any) => {
      if (note.id === updatedNote.id) {
        return updatedNote
      }

      const getTitle = () => {
        const patern = /\#(.+?)(?:\n|$)/
        const result = updatedNote.body.match(patern)
        if (result) {
          updatedNote.title = result?.[1]
        } else {
          updatedNote.title = `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString().slice(0, -3)}`
        }
      }

      getTitle()
      return note
    })

    setNotes(updatedNotesArr)
  }

  const getActiveNote = () => {
    const res = notes.find(({ id }: { id: any }) => id === activeNote)

    return res
  }

  const onClose = () => {
    setActiveNote('')
    navigate('/')
  }

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header onAddNote={onAddNote} />
              <ListNotes notes={notes} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} />
            </>
          }
        />

        <Route path='/note/:id' element={<Editor activeNote={getActiveNote()} onUpdateNote={onUpdateNote} close={onClose} onDeleteNote={onDeleteNote} id={activeNote} />} />
      </Routes>
    </div>
  )
}

export default App
