import React from 'react';
import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';

const Home = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
    const { data: userData } = useQuery(QUERY_ME);
    const posts = data?.posts || [];

    const loggedIn = Auth.loggedIn();

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
                        />
                    )}
                </div>
            </div>
        </main>
    );
};

export default Home;