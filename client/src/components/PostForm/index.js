import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_POST, QUERY_ME } from '../../utils/queries';

const PostForm = () => {
    const [postText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0)

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME })
                cache.writeQuery({
                    query:QUERY_ME,
                    data: { me: { ...me, posts: [...me.posts, addPost] } }
                })
            } catch (e) {
                console.warn('ffff')
            }

            const { posts } = cache.readQuery({ query: QUERY_POSTS })
            cache.writeQuery({
                query:QUERY_POSTS,
                data: { posts: [addPost, ...posts] }
            })
        }
    })

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setText(event.target.value)
            setCharacterCount(event.target.value.length)
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { postText }
            })

            setText('');
            setCharacterCount(0)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
            >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Write your thoughts here...</Form.Label>
                    <Form.Control as="textarea" rows={5} onChange={handleChange} />
                </Form.Group>
                <Button variant='info'>Submit</Button>
            </Form>
        </div>
    )
}

export default PostForm;