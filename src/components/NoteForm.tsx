import { Form, Stack, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateableReactSelect from 'react-select/creatable';
import {Dispatch, FormEvent, useRef, useState} from 'react';
import { NoteData, Tag } from "../App";
import {v4 as uudiv4} from 'uuid';

export type NoteFormProps = {
    onSubmit : (data: NoteData) => void,
    setTagInLocalStorage : Dispatch<React.SetStateAction<Tag[]>>,
    availableTags : Tag[]
}

const NoteForm = (props: NoteFormProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);

    console.log(selectedTags)

    const handleSubmit = (event : FormEvent) => {
        event.preventDefault();
        props.onSubmit({
            title: titleRef.current!.value,
            markdown : markdownRef.current!.value,
            tags : selectedTags
        })
    }

    function onAddNewTag(tag : Tag){
        props.setTagInLocalStorage(prevTags => {
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
                                <Form.Control ref={titleRef} required/>
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
                                            const newTag = {id: uudiv4(), name: label}
                                            onAddNewTag(newTag);
                                            setSelectedTags(prevTags => {
                                                return {
                                                    ...prevTags,
                                                    newTag
                                                }
                                            })
                                        }
                                    }

                                    options = {props.availableTags.map((tag)=>{
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
                    <Row>
                        <Form.Group controlId="markdown">
                            <Form.Label>Body</Form.Label>
                            <Form.Control ref={markdownRef} as="textarea" rows={20}></Form.Control>
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