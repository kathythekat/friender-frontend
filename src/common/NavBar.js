import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

function NavBar() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Friender</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink to="/matches">Matches</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/messages">Messages</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signup">Signup</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/logout">Logout</NavLink>
          </NavItem>
        </Nav>
        <NavbarText>Simple Text</NavbarText>
      </Navbar>
    </div>
  );
}

export default NavBar;
