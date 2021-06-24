import React from 'react'
import { Button, Form, FormControl, Nav, Navbar, NavbarBrand } from 'react-bootstrap'

const Header = () => {
    return (
        
            <Navbar>
                <Nav class="navbar bg-primary my-2 my-lg-0 px-2 px-lg-4">

                    <Form inline name="searchForm">
                        <NavbarBrand href="#">Project Explorer</NavbarBrand>
                        <FormControl type="text" placeholder="Search Projects" class="mr-sm-2"/>
                        <Button type="submit" variant="outline-light" class="mr-sm-2">Search</Button>
                        <NavbarBrand href="#">Submit</NavbarBrand>
                    </Form>
                    <Nav>
                        <NavbarBrand href="register.html">Sign up</NavbarBrand>
                        <NavbarBrand href="login.html">Login</NavbarBrand>
                    </Nav>
                </Nav>
            </Navbar>
    )
}

export default Header
