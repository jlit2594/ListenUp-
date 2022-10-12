import React from 'react';
import { useParams } from 'react-router-dom';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import Auth from '../utils/auth';

const PostPage = () => {
    const { id: postId } = useParams();

    const { loading, data } = useQuery()

    const post = data?.post || {};

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <main>
            <div>
                <div>
                    <h2>{post.title}</h2>
                    <h4>{post.username} at {post.createdAt}</h4>
                </div>
                <div>
                    {post.text}
                </div>
            </div>
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