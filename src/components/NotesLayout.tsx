import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Note } from "../App";

export type NotesLayoutProps = {
    notes : Note[]
}


const NotesLayout = ({ notes } : NotesLayoutProps)=>{
    const {id} = useParams()
    const note = notes.find(n => n.id === id)

    if(note == null){
        return <Navigate to="/"/>
    }

    return (
        <Outlet context={note}/>
    )
}

export default NotesLayout;


export function useNote() {
    return useOutletContext<Note>();
} 