import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/card';

const FaveTrailList = ({ trails, title }) => {
    if (!trails.length) {
        return <h3>There is nothing here yet.</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            {trails &&
            trails.map(trail => (
                <Card>
                    <Card.img>{trail.img}</Card.img>
                    <Card.body>
                        <Card.title>
                            <Link to={`/trail/${trail._id}`}>
                                {trail.title}
                            </Link> 
                        </Card.title>
                        <Card.text>
                            {trail.text}
                        </Card.text>
                    </Card.body>
                </Card>
            ))}
        </div>
    )
};

export default FaveTrailList;