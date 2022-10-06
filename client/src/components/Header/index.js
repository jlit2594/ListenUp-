import React from 'react';
import Auth from '../../utils/auth';
import Button from 'react-bootstrap/Button';

const Header = () => {
    const logout = (event) => {
        event.preventDefault();

        Auth.logout();
    }

    return (
        <div>
            <div>
                <h1>TITLE</h1>
            </div>
            <div>
                {Auth.loggedIn() ? (
                    <>
                        <Button variant='danger'>Your Profile</Button>
                        <Button variant='danger'>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button variant='danger'>Login</Button>   
                        <Button variant='danger'>Signup</Button>                  
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;