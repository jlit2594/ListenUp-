import React, { useState } from 'react';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' })
    const [addUser, { error }] = useMutation(ADD_USER)

    // handles user signup + adds user to db
    const handleSignUpFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const { data } = await addUser({
                variables: { ...formState }
            });
    
            Auth.login(data.addUser.token)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Form onSubmit={handleSignUpFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Pick a Cool Username</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Signup
            </Button>
        </Form>  
    )
}

export default Signup;