import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const HeaderNav = ({button}) => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Link className='navbar-brand' to="/">Stitches</Link>
        <div className='d-flex flex-row-reverse'>
          <div>
            {button}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default HeaderNav;