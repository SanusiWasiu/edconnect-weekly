import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Row, Col, FormControl, FormGroup, FormLabel, Button, Form} from 'react-bootstrap';
import { useHistory } from 'react-router';
import Layout from './shared/Layout';

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [validationError, setvalidationError] = useState()
    let history = useHistory()

    const handleInputChange = event => {
        const {name, value} = event.target;
        switch(name){
            case 'passwords':
                setpassword(value);
                break;
            case 'emails':
                setemail(value);
        }
    }

    const HandleSubmit = event =>{
        event.preventdefaualt();
        
        useEffect(()=> {
            let postData = {
                Email: email,
                Password: password,
            }
            
            let asyncPost = async function(){
                const response = await fetch("/api/login", {
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
                    
                } else {
                    setvalidationError(true)
                }
            }).catch(err => console.log(err))
        }, [])
    }

    return (
        <Layout>
            <Container>
                <Form class="form-group mx-auto my-5 w-75" id="loginForm" onSubmit={HandleSubmit}>
                    <h1>Login</h1>

                    {validationError? 
                    (<Container>
                        <Row>
                            <Col>
                                <div class="alert alert-danger" role="alert" id='logalert'>
                                    <p>Invalid email/password</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>) : null}

                    <FormLabel>Email Address</FormLabel>
                    <FormControl type="email" name="emails" id="email" placeholder="Enter Email" value={email} onChange={handleInputChange} /><br/><br/>
    
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" name="passwords" id="password" placeholder="Password" value={password} onChange={handleInputChange} /><br/><br/>
    
                    <Button type="submit" class="btn btn-primary">Login</Button>                
                </Form>
            </Container>
        </Layout>
    )
}

export default Login
