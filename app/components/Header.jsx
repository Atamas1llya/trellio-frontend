import React from 'react';

import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const Header = ({ token, user, ...actions }) => {
  if (token && user) {
    return (
      <Navbar id="page-header" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="brand" to="/">Trellio</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown id="header-dropdown" title={user.name}>
              <MenuItem onClick={actions.exit}>Exit</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar id="page-header" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="brand" to="/">Trellio</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="#" onClick={() => actions.toggleModal('LOGIN')}>Log in</NavItem>
            <NavItem href="#" onClick={() => actions.toggleModal('SIGNUP')}>Sign up</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};

export default Header;
