import React, { useEffect, useState } from 'react'
import { Button, Form, FormControl, Nav, Navbar, NavbarBrand } from 'react-bootstrap'
import { useHistory } from 'react-router';

const Header = () => {
    const [cookieValue, setcookieValue] = useState("")
    const [logStatus, setlogStatus] = useState('Sign up')
    const [userStatus, setuserStatus] = useState('Login')
    let history = useHistory()

    useEffect(()=>{
        var callIndex = async function () {
            setcookieValue(document.cookie
                .split('; ')
                .find(row => row.startsWith('uid='))
                .split('=')[1]);
    
            if (cookieValue !== "") {
                let response = await fetch(`/api/users/${cookieValue}`)
                console.log(response)
                return response.json()
    
            }
        }
        callIndex().then(data => {
            setuserStatus(`Hi, ${data.firstname}`);
            setlogStatus('Logout');
    
        }).catch(err => console.log(err.message))
    })
    
    const HandleLogout = event => {
        event.preventDefault();
        if (logStatus === 'Logout'){
            document.cookie = `uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
            history.push("index.html");
        }
        history.push('/Signup');
    }
    
    return (

        <Navbar className="bg-primary justify-content-between my-2 my-lg-0 px-2 px-lg-4">
            <Nav className="justify-content-evenly">
                <NavbarBrand href="#" className="text-light">Project Explorer</NavbarBrand>
                <Form inline class="mx-sm-2">
                    <FormControl type="text" placeholder="Search Projects" class="mx-sm-2" />
                </Form>

                <Button type="submit" variant="outline-light" class="mx-sm-2">Search</Button>

                <NavbarBrand href="#" className="text-light mx-sm-2">Submit</NavbarBrand>
            </Nav>

            <Nav>
                <NavbarBrand href="register.html" className="text-light" onClick={HandleLogout} >{ logStatus }</NavbarBrand>
                <NavbarBrand href="login.html" className="text-light">{ userStatus }</NavbarBrand>
            </Nav>
        </Navbar>
    )
}

export default Header
