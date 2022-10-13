import { gql } from '@apollo/client';

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            posts {
                _id
                postTitle
                postText
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
        posts {
            _id
            postTitle
            postText
            createdAt
            commentCount
            comment {
                _id
                createdAt
                commentBody
                username
            }
        }
    }
}
`;

export const QUERY_POSTS = gql`
  query posts($username: String) {
    posts(username: $username) {
      _id
      postTitle
      postText
      createdAt
      username
      commentCount
      comments {
        _id
        createdAt
        username
        commentBody
      }
    }
  }
`;

export const QUERY_POST = gql`
    query post($id: ID!) {
        post(_id: $id) {
            _id
            postTitle
            postText
            createdAt
            username
            commentCount
            comments {
                _id
                createdAt
                username
                commentBody
            }
        }
    }
`;