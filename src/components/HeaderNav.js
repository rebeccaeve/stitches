import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const HeaderNav = ({button}) => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/">Stitches</Navbar.Brand>
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