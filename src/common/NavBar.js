import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import UserContext from "../auth/userContext";

function NavBar() {
  const { currentUser } = useContext(UserContext);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Friender</NavbarBrand>
      <Nav className="mr-auto" navbar>
        {currentUser && 
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/matches">
            Matches
          </NavLink>
        </NavItem>
        }
        {currentUser && 
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/messages">
            Messages
          </NavLink>
        </NavItem>
        }
        {currentUser && 
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/profile">
            Profile
          </NavLink>
        </NavItem>
        }
        {!currentUser && 
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </NavItem>
        }  
        {!currentUser &&        
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/signup">
            Signup
          </NavLink>
        </NavItem>
        }
        {currentUser && 
        <NavItem className="nav-item mr-4">
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </NavItem>
        }
      </Nav>
    </Navbar>
  );
}

export default NavBar;
