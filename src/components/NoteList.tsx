import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect  from "react-select";
import { Note, Tag } from "../App";
import { Dispatch, useMemo, useState } from "react";
import '../NotesList.css';
import EditTagsModal from "./EditTagsModal";

export type SimplifiedNote = {
    id : string,
    title : string,
    tags : Tag[],
}

export type NoteListProps = {
    availableTags : Tag[],
    notes : Note[],
    onUpdateTag : (id: string, data: Tag) => void,
    onDeleteTag : (id: string) => void,
    showModal : boolean,
    setShowModal : Dispatch<React.SetStateAction<boolean>>
}

const NoteList = ({notes, availableTags, onUpdateTag, showModal, setShowModal, onDeleteTag}: NoteListProps) => {
    document.title = "Notes List"
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>("");

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
          return (
            (title === "" ||
              note.title.toLowerCase().includes(title.toLowerCase())) &&
            (selectedTags.length === 0 ||
              selectedTags.every(tag =>
                note.tags.some(noteTag => noteTag.id === tag.id)
              ))
          )
        })
      }, [title, selectedTags, notes])

    return (
    <>
        <Row className="align-items-center mb-4">
            <Col>
                <h1>Notes</h1>
            </Col>
            <Col xs="auto"> 
                <Stack gap={2} direction="horizontal">
                    <Link to="/new">
                        <Button variant="info">Create New</Button>
                    </Link>
                    <Button variant="secondary" onClick={()=>setShowModal(true)}>Edit Tag</Button>
                </Stack>
            </Col>
        </Row>
        <Form>
            <Row className="mb-3">
                <Col>
                    <Form.Group controlId="title">
                        <Form.Label><strong>Title</strong></Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={(event)=>setTitle(event.target.value)}>
                        </Form.Control>
                    </Form.Group>    
                </Col>
                <Col>
                    <Form.Group controlId="tags">
                            <Form.Label><strong>Tags</strong></Form.Label>
                            <ReactSelect 
                            value = {selectedTags.map(tag =>{
                                return {label: tag.name, value:tag.id}
                                })}
                            
                            options = {availableTags.map((tag)=>{
                                return {label : tag.name, value : tag.id}
                                })
                            }
                            onChange={tags => {
                                setSelectedTags(
                                    tags.map(tag => {
                                        return {name : tag.label, id: tag.value}
                                        })
                                    )
                                }
                            }    
                            isMulti />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} gap={3}>
            {
                filteredNotes.map(note => {
                    return <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                    </Col>
                })
            }                      
        </Row>
        <EditTagsModal onDeleteTag={onDeleteTag} showModal={showModal} setShowModal={setShowModal} availableTags={availableTags} onUpdateTag={onUpdateTag}/>
    </>
    )

}

export default NoteList;

const NoteCard = ({id, title, tags}: SimplifiedNote) => {
    return (
        <>
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none card`}>
            <Card.Body>
                <Stack className="align-items-center justify-content-center h-100">
                    <h2 className="text-center">{title}</h2>
                    {tags.length > 0 &&

                        <Stack gap={1} direction="horizontal" className="justify-content-center">
                        {tags.map((tag)=>{
                            return <Badge className="text-truncate" key={tag.id}>{tag.name}</Badge>
                        })}
                        </Stack>
                    }
                </Stack>
            </Card.Body>
        </Card>
        </>
    )
}