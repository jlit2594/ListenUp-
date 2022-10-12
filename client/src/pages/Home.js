import React from 'react';
import PostsList from '../components/PostsList';

const Home = () => {
    return (
        <div>
            <PostsList posts={posts} />
        </div>
    )
}

export default Home;