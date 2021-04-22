import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

function NavBar() {
  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Friender</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/matches">
            Matches
          </NavLink>
        </NavItem>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/messages">
            Messages
          </NavLink>
        </NavItem>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </NavItem>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Signup
          </NavLink>
        </NavItem>
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
