import { NoteData } from "../App";
import NoteForm, { NoteFormProps } from "./NoteForm"

const NewNote = ({onSubmit, setTagInLocalStorage, availableTags}: NoteFormProps) => {
    document.title = "Create a new note";
    return (
        <>
            <h1>Create Note</h1>
            <NoteForm onSubmit={onSubmit} setTagInLocalStorage={setTagInLocalStorage} availableTags={availableTags}/>
        </>
    )
}

export default NewNote;