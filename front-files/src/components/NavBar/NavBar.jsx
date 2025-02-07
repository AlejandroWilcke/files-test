import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-danger mb-4">
      <Container>
        <Navbar.Brand className='text-white' href="/">React Test App</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;