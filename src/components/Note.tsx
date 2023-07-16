import { Badge, Button, Col, Row, Stack } from "react-bootstrap"
import { useNote } from "./NotesLayout"
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export type NoteProps = {
    onDelete : (id: string) => void;
}

const Note = ({onDelete}: NoteProps) =>{
    const note  = useNote();
    document.title = note.title;
    return (
        <>
            <Row className="align-items-center w-100">
                <Col>
                    <Stack gap={2}>
                        <h1>{note.title}</h1>
                        <Stack direction="horizontal" gap={1}>
                            {note.tags.map((tag)=>{
                                return <Badge>{tag.name}</Badge>
                            })}
                        </Stack>
                    </Stack>
                    
                </Col>
                <Col>
                    <Stack direction="horizontal" gap={2}>
                        <Link to="edit"><Button variant="primary">Edit</Button></Link>
                        <Button onClick={()=>{onDelete(note.id)}} variant="outline-danger">Delete</Button>
                        <Link to="/"><Button variant="outline-secondary">Back</Button></Link>
                    </Stack>
                </Col>
            </Row>
            <Row className="mt-5">
                <ReactMarkdown>
                    {note.markdown}
                </ReactMarkdown>
            </Row>
        </>
    )
}

export default Note;