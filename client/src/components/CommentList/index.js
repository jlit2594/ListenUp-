import React from 'react';
import Card from 'react-bootstrap/Card';

const CommentList = ({ comments }) => {
    return (
        <div>
            <div className='cmt'>
                <h2>Comments</h2>
            </div>
            <div className='flex-column justify-space-evenly'>
                {comments && 
                comments.map(comment => (
                    <Card>
                        <Card.body>
                            <Card.title>{comment.username}</Card.title>
                            <Card.text>{comment.text}</Card.text>
                        </Card.body>
                    </Card>
                ))}
            </div>
        </div>
    )
};

export default CommentList;