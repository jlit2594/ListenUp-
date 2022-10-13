import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_POSTS } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutations';

const PostForm = () => {
    const [formState, setFormState] = useState({ title: '', text: '' });

    const [addPost, { error }] = useMutation(ADD_POST, {
        update(cache, { data: { addPost } }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME })
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, posts: [...me.posts, addPost] } }
                })
            } catch (e) {
                console.warn('ffff')
            }

            const { posts } = cache.readQuery({ query: QUERY_POSTS })
            cache.writeQuery({
                query: QUERY_POSTS,
                data: { posts: [addPost, ...posts] }
            })
        }
    })

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { ...formState }
            })

            window.location.replace('/profile')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control name="title" placeholder="name@example.com" onChange={handleChange} defaultValue={formState.title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Write your thoughts here...</Form.Label>
                    <Form.Control name="text" as="textarea" rows={5} onChange={handleChange} defaultValue={formState.text} />
                </Form.Group>
                <Button variant='info'>Submit</Button>
            </Form>
        </div>
    )
}

export default PostForm;