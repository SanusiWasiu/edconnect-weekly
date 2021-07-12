import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
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

            <Container>
                <Row className="my-4">
                    {Projects.map((item, index) => (
                        <Col key={item.id}>
                            <div>
                                <h5 className="px-2 text-primary">
                                    <Link className="btn btn-primary mr-sm-2" to={`/projects/${item.id}`}>{item.projectname}</Link>
                                </h5>
                                <h6 className="my-lg-0 px-2 text-secondary" key={item.createdBy}>{item.authors.map(author => author).join(',')}</h6>
                                <p className="my-lg-0 py-2 px-2">{item.abstract}</p>

                                <div className="d-flex justify-content-center align-items-center" key={item.name}>
                                    <small className="text-primary"> {item.tags.map(tag => <Link to="#">{tag}</Link>)}</small>
                                </div>
                            </div>
                        </Col>
                    ))}

                </Row>
            </Container>

        </Layout>

    )
}

export default Home
