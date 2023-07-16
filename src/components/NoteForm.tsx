import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreateableReactSelect from 'react-select/creatable';
import {Dispatch, FormEvent, useRef, useState} from 'react';
import { NoteData, Tag } from "../App";
import {v4 as uudidV4} from 'uuid';

export type NoteFormProps = {
    onSubmit : (data: NoteData) => void,
    setTagInLocalStorage : Dispatch<React.SetStateAction<Tag[]>>,
    availableTags : Tag[]
} & Partial<NoteData>

const NoteForm = ({onSubmit, setTagInLocalStorage, availableTags, title="", markdown="", tags=[], color="#ffffff"}: NoteFormProps) => {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const colorRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event : FormEvent) => {
        event.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown : markdownRef.current!.value,
            color : colorRef.current!.value,
            tags : selectedTags
        })
        navigate("/");
    }

    function onAddNewTag(tag : Tag){
        setTagInLocalStorage(prevTags => {
            return [...prevTags, tag]
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    defaultValue={title}
                                    ref={titleRef} 
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="tags">
                                    <Form.Label>Tags</Form.Label>
                                    <CreateableReactSelect 
                                    value = {selectedTags.map(tag =>{
                                        return {label: tag.name, value:tag.id}
                                        })}
                                    onCreateOption = {label => {
                                            const newTag = {id: uudidV4(), name: label}
                                            onAddNewTag(newTag);
                                            setSelectedTags(prevTags => [...prevTags, newTag])
                                        }
                                    }
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
                        <Col>
                            <Form.Group controlId="color">
                                <Form.Label>Note Color</Form.Label>
                                <Form.Control 
                                    defaultValue={color}
                                    ref={colorRef}
                                    type="color"
                                ></Form.Control>
                            </Form.Group>     
                        </Col>
                    </Row>
                    <Row>
                        <Form.Group controlId="markdown">
                            <Form.Label>Body</Form.Label>
                            <Form.Control 
                                defaultValue={markdown}
                                ref={markdownRef} 
                                as="textarea" 
                                rows={20}
                            >
                            </Form.Control>
                        </Form.Group>
                    </Row>
                    <Stack direction="horizontal" gap={3} className="justify-content-end">
                        <Button type="submit" variant="primary">Save</Button>
                        <Link to="..">
                            <Button type="button" variant="secondary">Cancel</Button>
                        </Link>
                    </Stack>
                </Stack>
            </Form>
        </>
    )
}

export default NoteForm;