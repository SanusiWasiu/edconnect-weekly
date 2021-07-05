import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Form, Row, Col, FormLabel} from 'react-bootstrap';
//import { useHistory } from 'react-router';
import Layout from './shared/Layout'
import { useParams } from "react-router";

const Project = () => {

    const [projectname, setprojectname] = useState();
    const [projectAbstract, setprojectAbstract] = useState();
    const [projectAuthors, setprojectAuthors] = useState([]);
    const [projectTags, setprojectTags] = useState();
    const [authorname, setauthorname] = useState();


    let projectId = useParams()
    useEffect(()=>{
        let asyncViewProj = async function(){
            const response = await fetch(`/api/projects/${projectId['id']}`)
            if (response.status === 200){
                return response.json()
            }else{
                throw new Error ("something went wrong")
            }
        }
        asyncViewProj().then(data => {
            
            setprojectname(data.name.toUpperCase);
    
            setprojectAbstract(data.abstract);

            setprojectAuthors(data.authors);

            setprojectTags(data.tags.join(' '));
    
            let createdById = data.createdBy
            fetch(`/api/users/${createdById}`)
                .then(response =>{
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error(`Response.status != 200 but: ${response.status}`)
                    }
                })
                .then(idData =>{
                    console.log(idData)
                    setauthorname(idData.firstname + idData.lastname);
                }).catch(error => console.log(error.message))
        }).catch(error => console.log(error.message))
    
    
    })

    return (
        <Layout>
            <Container class="my-4">
                <h2 id="project_name"> {projectname} </h2>
                <div class="row">
                    <div class="col">
                        <p>Created By</p>
                        <p id="project_author"> {authorname} </p>
                    </div>
                    <div class="col">
                        <p>Date Created</p>
                        <p>2020-08-30</p>
                    </div>
                    <div class="col">
                        <p>Last Updated</p>
                        <p>2020-08-30</p>
                    </div>
                    <div class="col d-flex justify-content-end align-items-right py-4">
                        <a href="editproject.html" class="btn btn-primary">Edit Project</a>
                    </div>
                </div>
            </Container>

            <Container>
                
                <Form class="form-group">
                    
                    <Row class="justify-content-between">
                    
                        <Col>
                            <h6>Project Abstract</h6>
                            <p id="project_abstract">
                                {projectAbstract}
                            </p>

                            <FormLabel>Comments</FormLabel>
                            <textarea class="form-control" id="abstract" rows="8" type="textarea" name="abstract" placeholder="Leave a comment"></textarea><br/><br/>
                            
                        </Col>

                        <Col>
                            <h6>Project details</h6>
                            <div class="card mb-5">
                                <div class="card-header">
                                    <h5>Author(s)</h5>
                                </div>
                                <div class="card-body" id="project_authors">
                                    {projectAuthors.map(author => {
                                        <div><p class="card-text">{author}</p></div>
                                    })}
                                </div>
                                <div class="card-footer" id="project_tags">
                                    <p class="card-text text-primary"> {projectTags} </p>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header">
                                    <h5>Project Files</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text text-center text-muted">No files uploaded yet</p>
                                </div>
                                
                            </div>
                            
                        </Col>
                    </Row>
                    <button type="submit" class="btn btn-primary">Save</button>
                </Form>
            </Container>
        </Layout>
    )
}

export default Project
