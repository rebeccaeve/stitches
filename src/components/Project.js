import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { db } from '../db';
import HeaderNav from './HeaderNav';
import Counter from './Counter'
import { loadProject, addCounter } from '../thunks';

const Project = ({ loadProject, project, counters, addCounter }) => {
  let params = useParams();
  const projectId = parseInt(params.projectId);
  const [modalVisible, setModalVisible] = useState(false);
  const [counterName, setCounterName] = useState("");

  const handleChange = (event) => {
    setCounterName(event.target.value);
  }

  const prepareCounter = () => {
    addCounter( {project_id: projectId, label: counterName, stitch_count: 0} );
    setCounterName('');
    closeModal();
  }

  const addButton = (
    <Button 
      onClick={ () => openModal() }
      variant='outline-primary'>
        <FontAwesomeIcon icon={faPlus} />
    </Button>
  )

  const closeModal = () => {
    setModalVisible(false);
  }

  const openModal = () => {
    setModalVisible(true);
  }

  const detectEnter = (e) => {
    e.preventDefault();
    if(e.key == "Enter"){
      prepareCounter();
    }
  }

  useEffect(()=>{
    loadProject(projectId);
  },[])

  const counterModal = (
    <Modal show={modalVisible} onHide={ () => closeModal() }>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Counter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control 
              value={counterName}
              onChange={ (event) => handleChange(event) }
              onKeyUp={ (event) => detectEnter(event) }
              type="text"
              placeholder='Enter a counter name'
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ () => closeModal() }>
          Close
        </Button>
        <Button variant="success" onClick={ () => prepareCounter() }>
          Add Counter
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <HeaderNav button={addButton} />
      { counterModal }
      <Container>
        <Row>
          <Col>
            <h3>{project.project_name}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {counters.map((c) =>
              <Counter c={c} key={`counter_${c.counter_id}`} />
            )}
          </Col>
        </Row>
      </Container>
    </>
    
  )
}

const mapStateToProps = state => ({
  project: state.store.current_project,
  counters: state.store.counters
})

const mapDispatchToProps = dispatch => ({
  loadProject: (project_id) => dispatch( loadProject(project_id) ),
  addCounter: (counter) => dispatch( addCounter(counter) ) 
})

export default connect(mapStateToProps, mapDispatchToProps)(Project);