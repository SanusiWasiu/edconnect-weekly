import React from 'react';
import { Col } from 'react-bootstrap'
const ShowProject = ({ name, abstract, authors, tags }) => {

    return (

        <Col className="col-sm-3 ">
            <div className="card" style={{ width: 16 + 'rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{authors.map((author, index) => <span key={index}>{authors[index + 1] ? author + ', ' : author}</span>)}</h6>
                    <p className="card-text">Description: {abstract}</p>
                    {tags.map((tag, index) => <a href="#" className="card-link" key={index}>{'#' + tag}</a>)}


                </div>
            </div>
        </Col>

    );
}

export default ShowProject;