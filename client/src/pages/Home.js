import React from 'react';
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';

import { useQuery } from '@apollo/client';
import QUERY_POSTS from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    return (
        <main>
            {loading ? (
                <div>Loading...</div>
            ) : (
            <PostsList posts={posts} />    
            )}
        </main>
    )
}

export default Home;