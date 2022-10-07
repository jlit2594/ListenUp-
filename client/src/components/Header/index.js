import React from 'react';
import Auth from '../../utils/auth';
import Button from 'react-bootstrap/Button';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();

        Auth.logout();
    }

    return (
        <div className='d-flex justify-content-between p-3 header'>
            <div className='align-center'>
                <h1 className='logo'>Listen Up!</h1>
            </div>
            <div className='d-flex'>
                {Auth.loggedIn() ? (
                    <>
                        <Button variant='outline-danger' className="m-2">Your Profile</Button>
                        <Button variant='danger' className="m-2">Logout</Button>
                    </>
                ) : (
                    <>
                        <Button variant='outline-danger' className="m-2">Login</Button>   
                        <Button variant='danger' className="m-2">Sign Up</Button>   
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;