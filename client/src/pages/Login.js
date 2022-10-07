import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);

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
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <div className='d-flex flex-column'>
                <Button className='mb-3' variant="danger" type="submit">
                    Login
                </Button>
                <Link className='sign-link'>Don't have an account yet? Sign up here!</Link>  
                </div>                  
            </Form>  
        </main>
    )
}

export default Login;