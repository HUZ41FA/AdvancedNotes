import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {Routes, Route, Navigate} from 'react-router-dom';
import NewNote from './components/NewNote';
import { useLocalStorageHook } from "./customHooks/useLocalStorageHook";
import { useMemo } from "react";
import {v4 as uudiv4} from 'uuid';



export type Note = {
  id : string,
  title : string,
  markdown : string,
  tags : Tag[]
}

export type NoteData = {
  title : string,
  markdown : string,
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
  tagIds : string[]
}


function App() {
  const [notes, setNotes] = useLocalStorageHook<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorageHook<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(()=>{
    return notes.map(note => {
      return {...note, tags : tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData){
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id : uudiv4(), tagIds : tags.map(tag=>tag.id)
        }
      ]
    })
  }


  return (
    <Container className="my-4">
      <Routes>
          <Route path="/" element={<h1>Home</h1>}/>
          <Route path="/new" element={<NewNote onSubmit={onCreateNote} setTagInLocalStorage={setTags} availableTags={tags}/>}/>
          <Route path="/:id">
            <Route index element={<h1>View Note</h1>} />
            <Route path="edit" element={<h1>Edit Note</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Container>
     
  )
}

export default App
