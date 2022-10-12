import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const TopSongsList = ({ posts }) => {
    if (!posts.length) {
        return <h3>Oops! We did it again!</h3>
    }

    return (
        <div>
            <h3>Top Posts</h3>
            {posts &&
            posts.map(post => (
                <Card>
                    <Card.body>
                        <Card.title>
                            <Link to={`/song/${post._id}`}>
                                {post.title}
                            </Link>
                        </Card.title>
                        <Card.text>
                            {post.text}
                        </Card.text>
                    </Card.body>
                </Card>
            ))}
        </div>
    )
}

export default TopSongsList;