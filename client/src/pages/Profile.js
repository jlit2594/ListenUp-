import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import FaveSongsList from '../components/FaveSongsList';

import Auth from '../utils/auth';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedin() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile" />
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div>
                {/* probably some stuff about the user  */}
            </div>
            <div>
                <PostsList posts={user.posts} title={`${user.usename}'s posts`} />
            </div>
        </div>
    )
}

export default Profile;