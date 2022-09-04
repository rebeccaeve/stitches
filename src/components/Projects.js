import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import HeaderNav from './HeaderNav';
import { getProjects, addProject } from '../thunks';
import { connect } from 'react-redux';

const Projects = ({ getProjects, projects, addProject }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleChange = (event) => {
    setProjectName(event.target.value);
  }

  const addButton = () => {
    return(<Button onClick={()=>openModal()} variant='outline-primary'>Add</Button>)
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const openModal = () => {
    setModalVisible(true);
  }

  const newProject =() => {
    addProject(projectName)
    setProjectName('');
    closeModal();
  }

  const projectModal = () => {
    return (
      <Modal show={modalVisible} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control value={projectName} onChange={(event)=>handleChange(event)} type="text" placeholder='Enter a project name' />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>
            Close
          </Button>
          <Button variant="success" onClick={() => newProject()}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }

  useEffect(()=>{
    getProjects();
  },[])

  return (
    <>
      <HeaderNav button={addButton()} />
      {projectModal()}
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {projects.map((p) => 
                <Link className="list-group-item action" to={`/project/${p.project_id}`} key={`project_${p.project_id}`}>
                  {p.project_name}
                </Link>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
    
  )
}

const mapStateToProps = state => ({
  projects: state.store.projects
})

const mapDispatchToProps = (dispatch) => ({
  getProjects: () => { dispatch( getProjects() ) },
  addProject: (project_name) => { dispatch( addProject(project_name) )}
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects);