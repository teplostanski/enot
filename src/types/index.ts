/* eslint-disable @typescript-eslint/no-explicit-any */
export type TObject = {
  [index: string]: any
}

export interface IToggleObjectValue extends TObject {
  [index: string]: boolean
}

export type TEditorProps = {
  activeNote: any
  onUpdateNote: any
  close: any
  onDeleteNote: any
  id: string
}

export type THeaderProps = {
  onAddNote: any
}

export type TNewNote = {
  id: string
  title: any
  body: string
  lastModified: number
}

export type TConfirmDeleteProps = {
  setOpen: any
  yes: string
  no: string
  onDeleteNote: any
}

export type TDeleteNoteProps = {
  onDeleteNote: any
  id: any
  text: string
}

export type TListNotesProps = {
  notes: any
  onDeleteNote: any
  activeNote: any
  setActiveNote: any
}

export type TModalProps = {
  open: any
  setOpen: any
  children: JSX.Element
}
