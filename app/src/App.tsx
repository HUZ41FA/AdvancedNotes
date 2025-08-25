import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from 'react-router-dom';
import NewNote from './components/NewNote';
import { useLocalStorageHook } from "./customHooks/useLocalStorageHook";
import { useMemo, useState } from "react";
import {v4 as uuidV4} from 'uuid';
import NoteList from "./components/NoteList";
import NotesLayout from "./components/NotesLayout";
import Note from "./components/Note"
import EditNote from "./components/EditNote";

export type Note = {
  id : string,
} & NoteData

export type NoteData = {
  title : string,
  markdown : string,
  color : string,
  tags : Tag[]
}

export type Tag = {
  id : string,
  name : string
}

export type RawNote = {
  id : string
} & RawNoteData

export type RawNoteData = {
  title : string,
  markdown : string,
  color : string,
  tagIds : string[]
}

function App() {
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useLocalStorageHook<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorageHook<Tag[]>('TAGS', [])

  const notesWithTags : Note[] = useMemo(()=>{
    return notes.map(note => {
      return {...note, tags : tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData){
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id : uuidV4(), tagIds : tags.map(tag=>tag.id)
        }
      ]
    })
  }

  function onUpdateNote(id: string, {tags, ...data}: NoteData){
    debugger;
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if(note.id === id){
          return {...note, ...data, tagIds : tags.map(tag => tag.id)}
        }else{
          return note
        }
      })
    })
  }


  function onDeleteNote(id: string){
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id != id);
    });
    return <Navigate to="/"/>
  }

  function onUpdateTag(id: string, {...data}: Tag){
    setTags(prevTags=>{
      return prevTags.map(tag => {
        if(id === tag.id){
          return {...tag, ...data}
        }else{
          return tag
        }
      })
    })
  }

  function onDeleteTag(id:string){
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id != id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
          <Route path="/" element={<NoteList onDeleteTag={onDeleteTag} showModal={showModal} setShowModal={setShowModal} onUpdateTag={onUpdateTag} notes={notesWithTags} availableTags={tags}/>}/>
          <Route path="/new" element={<NewNote onSubmit={onCreateNote} setTagInLocalStorage={setTags} availableTags={tags}/>}/>
          <Route path="/:id" element={<NotesLayout notes={notesWithTags}/>}>
            <Route index element={<Note onDelete={onDeleteNote}/>} />
            <Route path="edit" element={<EditNote onSubmit={onUpdateNote} setTagInLocalStorage={setTags} availableTags={tags}/>} />
          </Route>
          <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Container>
     
  )
}

export default App
