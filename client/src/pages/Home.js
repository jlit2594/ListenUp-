import React from 'react';
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';

import { useQuery } from '@apollo/client';
import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const posts = data?.posts || [];

    return (
        <main>
            <div className="flex-row justify-space-between">
                {loggedIn && (
                    <div className="col-12 mb-3">
                        <PostForm />
                    </div>
                )}
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PostsList 
                            posts={posts}
                            title ="The Music Feed"
                        />   
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;