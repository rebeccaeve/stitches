import React, { useState } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faPencil, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

import { saveCounter, deleteCounter } from "../thunks";

const Counter = ( {c, saveCounter} ) => {
  const [thecount, setCount] = useState(c.stitch_count);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(c.label);

  const updateCounter = (amt) => {
    setCount( (amt) < 0 ? 0 : parseInt(amt));
  }

  const handleChange = (event) => {
    setLabel(event.target.value);
  }

  const editButtonClicked = () => {
    if(editing){
      c.stitch_count = thecount;
      saveCounter(c);
    }

    setEditing(!editing);
  }

  const editButton = (
    <Button 
      variant={editing ? 'outline-success' : 'outline-primary'} 
      className={'me-auto'}
      size={'sm'}
      onClick={ () => editButtonClicked() }
    >
      <FontAwesomeIcon icon={editing ? faSave : faPencil} />
    </Button>
  )

  const title = (
    <div className={'me-auto ms-auto'}>
      {label}
    </div>
  )

  const labelEditor = (
    <Form.Control 
      value={label}
      className={'me-auto ms-auto'}
      onChange={ (event) => handleChange(event) } 
      type="text"
    />
  )

  const counterLabel = (
    <label className="counter-label ms-3 me-3">{thecount}</label>
  )

  const counterEditor = (
    <Form.Control 
      value={thecount}
      className={'ms-3 me-3'}
      onChange={ (event) => updateCounter(event.target.value) } 
      type="number"
      style={{maxWidth: "50px"}}
    />
  )
  

  return (
    <Card className={'mb-3'}>
      <Card.Header>
        <div className={'d-flex'}>
            {editButton}
            {editing ? labelEditor : title}
            <Button 
              variant={'outline-danger'}
              className={'ms-auto'}
              size={'sm'}
              onClick={() => deleteCounter(c)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
      </Card.Header>
      <Card.Body className="d-flex">
        
        <Button variant={'primary'} onClick={ () => updateCounter(thecount - 1)} className={"ms-auto"} size="lg">
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        {editing ? counterEditor : counterLabel}
        <Button variant={'primary'} onClick={ () => updateCounter(thecount + 1)} className={"me-auto"} size="lg">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        
      </Card.Body>
    </Card>
  )
}

const mapDispatchToProps = (dispatch) => ({
  deleteCounter: (counter) => { dispatch( deleteCounter(counter) )},
  saveCounter: (counter) => { dispatch( saveCounter(counter) )},
  
})

export default connect(null, mapDispatchToProps)(Counter);