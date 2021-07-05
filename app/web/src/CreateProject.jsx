import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Container, FormControl, Button, Col, Form, FormLabel, Row} from 'react-bootstrap';
import Layout from './shared/Layout';

const CreateProject = () => {
    
    const [validationError, setvalidationError] = useState([])
    
    const [ProjectName, setprojectName] = useState('')
    const [Abstract, setAbstract] = useState('')
    const [Authors, setAuthors] = useState('')
    const [Tags, setTags] = useState('')
    let history = useHistory()

    const handleInputChange = event => {
        const {name, value} = event.target;
        switch(name){
            case 'name':
                setprojectName(value);
                break;
            case 'abstract':
                setAbstract(value);
                break;
            case 'authors':
                setAuthors(value)
                break;
            case 'tags':
                setTags(value);
                break;
            default:
        }
    }

    const HandleSubmit = event => {
        event.preventdefaualt()
        
        useEffect(() => {
            let postData = {
                projectname: ProjectName,
                abstract: Abstract,
                authors: Authors,
                tags: Tags
            }

            let asyncPost = async function () {
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
                if (uData.status === 200) {
                    // let key = "uid";
                    // let cookieAge = 60 * 60 * 24 * 7;
                    // let value = encodeURIComponent(uData.data.id);
                    // document.cookie = `${key}=${value}; max-age=${cookieAge}; path=/;`;
                    //window.location.href = "/project-explorer/index.html"
                    history.push("/Home")

                } else {
                    if (validationError !== []) {
                        setvalidationError([])
                    }
                    setvalidationError(uData.errors)
                }
            }).catch(err => console.log(err))
        }, [])


    }

    let cookie = document.cookie.split(';').filter(item => item.trim().startsWith("uid"));
    if (cookie.length > 0) { // If a cookie still exists 
        let cookieName = cookie[0].trim().split('=')[1];
        if (cookieName === '') {
            //window.location.href = "/project-explorer/login.html"; // Redirect to login.html
            history.push('/Login')

        }
    } else {
        //window.location.href = "/project-explorer/login.html"; // Redirect to login.html
        history.push('/Login')
    }

    return (
        <Layout>
            <Container>
                <Form class="form-group mx-auto my-5 w-75" id="createProjectForm" onSubmit={HandleSubmit}>
                    <Container class="my-5 mx-auto w-75">
                        <h1>Submit Project</h1>

                        
                        <Container>
                            <Row>
                                <Col>
                                    {console.log(validationError)}
                                    {(validationError.length > 0) ?
                                   (<div class="alert alert-danger" role="alert" id='projectAlert'>
                                        {validationError.map((Error) => (
                                            <p>{Error}</p>
                                        ))}
                                    </div>) : null}
                                </Col>
                            </Row>
                        </Container>

                        <FormLabel>Project name</FormLabel>
                        <FormControl type="text" name="name" placeholder="Enter project name" value={ProjectName} onChange={handleInputChange} /><br/><br/>

                        <FormLabel>Abstract</FormLabel>
                        <textarea class="form-control" rows="10" type="textarea" name="abstract" value={Abstract} onChange={handleInputChange}></textarea><br/><br/>

                        <FormLabel>Author(s)</FormLabel>
                        <FormControl type="text" name="authors" placeholder="Enter author names (seperated by comma)" value={Authors} onChange={handleInputChange} /><br/><br/>

                        <FormLabel>Tags</FormLabel>
                        <FormControl type="text" name="tags" value={Tags} onChange={handleInputChange} placeholder="Use # to tag project with different topics (e.g. #javascript #mongodb)"/><br/><br/>
                        
                        <Button type="submit" class="btn btn-primary" id="contBtn">Continue</Button>
                    </Container>
                
                </Form>    
            </Container>
        </Layout>
            
    )
}

export default CreateProject
