import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';
import Alert from 'react-bootstrap/Alert';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' })
    const [addUser, { error }] = useMutation(ADD_USER)

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

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
        <main>
            <Form className='login-form mt-4' onSubmit={handleSignUpFormSubmit}>
                <h2 className='login mb-3'>Sign Up</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange} defaultValue={formState.email} type="email" name="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pick a Cool Username</Form.Label>
                    <Form.Control onChange={handleChange} defaultValue={formState.username} name="username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} defaultValue={formState.password} type="password" name="password" />
                </Form.Group>
                <div className='d-flex flex-column'>
                <Button className='mb-3' variant="info" type="submit">
                    Sign me up!
                </Button>
                <Link to="/login" className='sign-link'>Already have an account? Login here!</Link>
                </div>
            </Form>  
            {error &&
            <Alert variant='danger'>Oops... something went wrong...</Alert>}
        </main>
    )
}

export default Signup;