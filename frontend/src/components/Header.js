import React, { useState } from "react";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { useEffect } from "react";

const Header = () => {
  const [hai,setHai]=useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
 const data=localStorage.getItem('userInfo')
 const data1=JSON.parse(data)
 
  useEffect(()=>{
  setHai(true)
  },[hai])



  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand className="header-logo" onClick={(e) => navigate("/")}>
            SportsCart
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
         
         <LinkContainer to='/admin/wishlist'>

           <Nav.Link>
           <i className="fa fa-heart" aria-hidden="true"></i>
           </Nav.Link>
         
         </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {data ? (
                <NavDropdown title={data1.name } id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-usr"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/offers">
                    <NavDropdown.Item>Offers and Coupons</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/salesreport">
                    <NavDropdown.Item>Sales report</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
