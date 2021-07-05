import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Layout from './shared/Layout'

const Signup = () => {
    const [Program, setProgram] = useState([])
    const [validationError, setvalidationError] = useState([])
    const [graduationYears, setgraduationYears] = useState([])
    const [firstname, setfirstname] = useState('')
    const [email, setemail] = useState('')
    const [program, setprogram] = useState('')
    const [lastName, setlastName] = useState('')
    const [password, setpassword] = useState('')
    const [matricNumber, setmatricNumber] = useState('')
    const [graduationYear, setgraduationYear] = useState('')
    let history = useHistory()

    const handleInputChange = event => {
        const {name, value} = event.target;
        switch(name){
            case 'Name':
                setfirstname(value);
                break;
            case 'email':
                setemail(value);
                break;
            case 'program':
                setprogram(value)
                break;
            case 'lastName':
                setlastName(value)
                break;
            case 'password':
                setpassword(value)
                break;
            case 'matricNumber':
                setmatricNumber(value)
                break;
            case 'graduationYear':
                setgraduationYear(value);
        }
    }

    useEffect(()=> {
        fetch('/api/programs')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('GET PROJECTS FAILED')
                }
            })
            .then((data) => {
                setProgram(data)
            })
            .catch((error) => {
                console.log(`GET PROJECTS FAILED: ${error}`)
            })
    }, [])

    useEffect(()=> {
        fetch('/api/graduationYears')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('GET PROJECTS FAILED')
                }
            })
            .then((data) => {
                setgraduationYears(data)
            })
            .catch((error) => {
                console.log(`GET PROJECTS FAILED: ${error}`)
            })
    }, [])

    const HandleSubmit = event =>{
        event.preventdefaualt();
        
        useEffect(()=> {
            let postData = {
                firstname: firstname,
                lastname: lastName,
                email: email,
                password: password,
                matricNumber: matricNumber,
                program: program,
                graduationYear: graduationYear
            }
            
            let asyncPost = async function(){
                const response = await fetch("/api/register", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData)
                })
                return response.json()
            }
            asyncPost().then(uData => {
                if (uData.status === 'ok') {
                    let key = "uid";
                    let cookieAge = 60 * 60 * 24 * 7;
                    let value = encodeURIComponent(uData.data.id);
                    document.cookie = `${key}=${value}; max-age=${cookieAge}; path=/;`;
                    //window.location.href = "/project-explorer/index.html"
                    history.push("/Home")
                    setvalidationError([])
                } else {
                    setvalidationError(uData.errors)
                }
            }).catch(err => console.log(err))
        }, [])
    }
    

    return (
        <Layout>
            <Container>
                <Form class="mx-auto my-5 w-75" id="signupForm" autocomplete="on" onSubmit={HandleSubmit}>
                    <h1>Signup</h1>

                    {(validationError.length > 0) ? 
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="alert alert-danger" role="alert" id='alert'>
                                    {validationError.map((Error) => (
                                        <p>{Error}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div> : null}

                    <Row class="justify-content-between">
                    
                        <FormGroup as={Col}>
                            <FormLabel>First name</FormLabel>
                            <FormControl type="text" name="Name" placeholder="First name" value={firstname} onChange={handleInputChange} /><br/><br/>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl type="email" name="email" placeholder="Your Email address" autocomplete="username" value={email} onChange={handleInputChange} /><br/><br/>
                            <FormLabel>Program</FormLabel>
                            <FormControl as='select' name="program" value={program} onChange={handleInputChange}>
                                <option selected disabled hidden>Choose....</option>
                                {Program.map((value)=> (
                                    <option key={value}>{value}</option>
                                ))}
                            </FormControl><br/><br/>    
                        </FormGroup>

                        <FormGroup as={Col}>
                            <FormLabel>Last name</FormLabel>
                            <FormControl type="text" name="lastName" value={lastName} onChange={handleInputChange} placeholder="Last name"/><br/><br/>
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" name="password" value={password} onChange={handleInputChange} placeholder="Your Password" autocomplete="current-password"/><br/><br/>
    
                            <Row>
                                <FormGroup as={Col}>
                                    <FormLabel>Matriculation number</FormLabel>
                                    <FormControl type="text" name="matricNumber" value={matricNumber} onChange={handleInputChange} placeholder="e.g. 16/2020"/><br/><br/>
                                </FormGroup>
                                <FormGroup as={Col}>
                                    <FormLabel>Graduation year</FormLabel>
                                    <FormControl as='select' name="graduationYear" value={graduationYear} onChange={handleInputChange}>
                                        <option selected disabled>Choose...</option>
                                        {graduationYears.map((year) =>(
                                            <option key={year}>{year}</option>
                                        ))}
                                    </FormControl>
                                    <br/><br/>
                                </FormGroup>
                            </Row>
                            
                        </FormGroup>
                    </Row>
                    <Button type="submit" class="btn btn-primary">Sign Up</Button>
                </Form>
                
            </Container>
        </Layout>
    )
}

export default Signup
