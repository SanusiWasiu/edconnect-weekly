import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from './shared/Layout';

const Home = () => {
    const [Projects, setProjects] = useState([]);
    useEffect(() => {
        fetch('/api/projects')
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('GET PROJECTS FAILED')
                }
            })
            .then((data) => {
                setProjects(data.slice(0, 4))
            })
            .catch((error) => {
                console.log(`GET PROJECTS FAILED: ${error}`)
            })
    }, []);
    return (
        <Layout>
            <Jumbotron>
                <Container className="my-4">
                    <h1>Welcome to Project Explorer</h1>
                    <p>Project Explorer is a repository for final year projects across all departments at your institution. you can submit your project and search project submitted by others to learn from</p>
                    <p>
                        <Link className="btn btn-primary mr-sm-2" to="register.html">Get Started</Link>
                        <Link className="btn btn-secondary mx-sm-2" to="login.html">Login</Link>
                    </p>
                </Container>

            </Jumbotron>
            <div className="album">
                <Container>
                    <div className="row showcase my-4">
                        {Projects.map((item, index) => (
                            <div className="col">
                                <div className="card my-2 py-4 px-2 box">
                                    <div class="card-body">
                                        <h5 className="card-title px-2 text-primary"><a href="viewproject.html?id={item.id}">{item.name}</a></h5>
                                        <h6 className="card-subtitle my-lg-0 px-2 text-secondary">{item.authors.join(', ')}</h6>
                                        <p className="card-text my-lg-0 py-2 px-2">{item.abstract}</p>
                                    </div>

                                    <div className="card-bottom d-flex justify-content-center align-items-center">
                                        <small className="text-primary">{item.tags.join(' ')}</small>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </Container>
            </div>
        </Layout>

    )
}

export default Home
