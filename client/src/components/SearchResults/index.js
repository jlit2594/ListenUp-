import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/card';

const SearchResults = ({ trails }) => {
    if (!trails.length) {
        return <h3>Sorry, we couldn't find any trails near that location</h3>
    }

    return (
        <div>
            {trails &&
            trails.map(trail => (
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={trail.img} />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/trail/${trail._id}`}>{trail.title}</Link>
                  </Card.Title>
                  <Card.Text>
                    {trail.text}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
    )
}

export default SearchResults;