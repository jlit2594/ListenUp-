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

export const QUERY_ME = gql`
{
    me {
        _id
        username
        email
        friendCount
        thoughts {
            _id
            thoughtText
            createdAt
            reactionCount
            reactions {
                _id
                createdAt
                reactionBody
                username
            }
        }
        friends {
            _id
            username
        }
    }
}
<<<<<<< HEAD
`;
=======
`;

export const QUERY_POSTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query thoughts($username: String) {
    thoughts(username: $username) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

// export const QUERY_COMMENTS = gql``;