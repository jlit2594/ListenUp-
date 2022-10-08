import React from 'react';
import { Link } from 'react-router-dom';
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
                        <Button variant='outline-info' className="m-2">
                            <Link to="/profile">Your Profile</Link>
                        </Button>
                        <Button variant='info' className="m-2" onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant='outline-info' className="m-2">
                            <Link to="/login">Login</Link>
                        </Button>   
                        <Button variant='info' className="m-2">
                            <Link to ="/signup">Sign Up</Link>
                        </Button>   
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;