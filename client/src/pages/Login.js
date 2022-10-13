import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';
import Alert from 'react-bootstrap/Alert';


import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value
        })
    }

    // user login on submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            })

            Auth.login(data.login.token)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <main>
            <Form className='login-form mt-4' onSubmit={handleFormSubmit}>
                <h2 className='login mb-3'>Login</h2>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange} defaultValue={formState.email} type="email" name="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} defaultValue={formState.password} name="password" type="password" />
                </Form.Group>
                <div className='d-flex flex-column'>
                <Button className='mb-3' variant="info" type="submit">
                    Login
                </Button>
                <Link to="/signup" className='sign-link'>Don't have an account yet? Sign up here!</Link>  
                </div>                  
            </Form>  
            {error &&
            <Alert variant='danger'>Login failed!</Alert>}
        </main>
    )
}

export default Login;