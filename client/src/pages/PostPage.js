import React from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Auth from '../utils/auth';

const PostPage = () => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery(QUERY_POST, {
        variables: { id: postId }
    })

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <main className='flex-row'>
            <Card>
                <Card.body>
                    <Card.title>{post.title}</Card.title>
                    <Card.subtitle>{post.username} at {post.createdAt}</Card.subtitle>
                    <Card.text>{post.text}</Card.text>
                </Card.body>
            </Card>
            <div>
                {post.commentCount > 0 && (
                    <CommentList comments={post.comments} />
                )}

                {Auth.loggedIn() && <CommentForm postId={post._id} />}
            </div>
        </main>
    )
}

export default PostPage;