import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useMutation } from '@apollo/client';

const CommentForm = ({ postId }) => {
    const [commentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, {error}] = useMutation()

    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length)
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addComment({
                variables: { commentBody, postId }
            })

            setBody('')
            setCharacterCount(0)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Charactercount : {characterCount}/280
                {error && <span>Something went wrong...</span>}
            </p>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Write your comment here</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Button variant='info'>Submit</Button>
            </Form>
        </div>
    )
}

export default CommentForm;