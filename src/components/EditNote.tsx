import { Dispatch } from "react"
import { NoteData, Tag } from "../App"
import NoteForm, { NoteFormProps } from "./NoteForm"
import { useNote } from "./NotesLayout"

export type EditNoteProps = {
    onSubmit : (id: string, note: NoteData) => void,
    setTagInLocalStorage : Dispatch<React.SetStateAction<Tag[]>>,
    availableTags : Tag[]
}

const EditNote = ({onSubmit, setTagInLocalStorage, availableTags}: EditNoteProps) => {
    const note = useNote();
    document.title = `Edit: ${note.title}`
    return (
        <>
            <h1>Editing Note</h1>
            <NoteForm title={note.title} tags={note.tags} markdown={note.markdown} onSubmit={data=>onSubmit(note.id, data)} setTagInLocalStorage={setTagInLocalStorage} availableTags={availableTags}/>
        </>
    ) 
}


export default EditNote;