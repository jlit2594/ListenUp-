import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Form className='login-form mt-4' onSubmit={handleSignUpFormSubmit}>
            <h2 className='login mb-3'>Sign Up</h2>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Pick a Cool Username</Form.Label>
                <Form.Control type="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
            </Form.Group>
            <div className='d-flex flex-column'>
            <Button className='mb-3' variant="danger" type="submit">
                Sign me up!
            </Button>
            <Link className='sign-link'>Already have an account? Login here!</Link>
            </div>
        </Form>  
    )
}

export default Signup;