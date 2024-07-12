import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import logo from  '../assets/logonew.png'
function Header() {
  return (
    <>
    <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
         <div className='d-flex justify-space-between'>
         <i class="fa-solid fa-users me-2"></i>  <p>Employee portal</p></div> 
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
