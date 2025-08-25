import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../App"
import { Dispatch } from "react"

export type EditTagsModalProps = {
    availableTags : Tag[],
    onUpdateTag : (id: string, data: Tag) => void,
    onDeleteTag : (id: string) => void,
    showModal: boolean,
    setShowModal : Dispatch<React.SetStateAction<boolean>>
}

const EditTagsModal = ({ availableTags, onUpdateTag, showModal, setShowModal, onDeleteTag }: EditTagsModalProps) => {
    return (
        <Modal show={showModal} onHide={()=>{setShowModal(false)}}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {
                            availableTags.map((tag)=>{
                                return (
                                    <Row key={tag.id}>
                                        <Col>
                                            <Form.Group controlId={tag.id}>
                                                <Form.Control 
                                                    type="text"
                                                    value={tag.name}
                                                    onChange={(event)=>{onUpdateTag(tag.id, {id:tag.id, name:event?.target.value})}}
                                                >
                                                    
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs="auto">
                                            <Button onClick={()=>{onDeleteTag(tag.id)}} variant="outline-danger">X</Button>
                                        </Col>
                                    </Row>
                                ) 
                            })
                        }
                    </Stack>
                    <Row>
                        
                    </Row>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditTagsModal;