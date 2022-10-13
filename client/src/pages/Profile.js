import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import PostsList from '../components/PostsList';
import PostForm from '../components/PostForm';

import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = (props) => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile:username" />
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user?.username) {
        return (
            <h1 className='align-center'>You can't look at this if you're not logged in</h1>
        )
    }

    return (
        <div>
            <div>
                <PostsList posts={user.posts} title={`${user.usename}'s posts`} />
            </div>
            <div>
                {!userParam && <PostForm />}
            </div>
        </div>
    )
}

export default Profile;