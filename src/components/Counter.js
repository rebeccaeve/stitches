import React, { useState } from "react";

import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faPencil, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'
import Button from "react-bootstrap/Button";

const Counter = ({c}) => {
  const [thecount, setCount] = useState(c.stitch_count);
  const [editing, setEditing] = useState(false);
  const updateCounter = (amt) => {
    setCount(thecount + amt);
  }

  const editButtonClicked = () => {
    if(editing){
      
    }

    setEditing(!editing);
  }

  const editButton = (
    <Button 
      variant={editing ? 'outline-success' : 'outline-primary'} 
      className={'me-auto'}
      size={'sm'}
      onClick={()=>setEditing(!editing)}
    >
      <FontAwesomeIcon icon={editing ? faSave : faPencil} />
    </Button>
  )

  return (
    <Card className={'mb-3'}>
      <Card.Header>
        <div className={'d-flex'}>
            {editButton}
            <div className={'me-auto ms-auto'}>
              {c.label}  
            </div>
            <Button variant={'outline-danger'} className={'ms-auto'} size={'sm'}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
        </div>
      </Card.Header>
      <Card.Body>
        
        <Button variant={'primary'} onClick={()=>updateCounter(-1)} className={"m-3"} size="lg">
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <label style={{fontSize: '22px', fontWeight:'bold'}} className="ms-3 me-3">{thecount}</label>
        <Button variant={'primary'} onClick={()=>updateCounter(1)} className={"m-3"} size="lg">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        
      </Card.Body>
    </Card>
  )
}

export default Counter;