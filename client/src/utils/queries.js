import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            faveTrails {
                _id
                trailName
            }
            comments {
                _id
                createdAt
            }
        }
    }
`;

export const QUERY_COMMENTS = gql``;