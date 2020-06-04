import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap'

const NavbarC = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar className='navbar-dark' dark color='primary' expand='sm'>
      <NavbarBrand href='/'>21 BlackJack </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar>
          <NavItem>
            <NavLink to='/' style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              to='/credits'
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Credits
            </NavLink>
          </NavItem>
        </Nav>
        <NavItem>
          <NavLink
            to='/widgets'
            style={{ color: 'white', textDecoration: 'none' }}
          >
            TestNavbar
          </NavLink>
        </NavItem>
      </Collapse>
    </Navbar>
  )
}

export default NavbarC
