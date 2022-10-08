import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import searchTrail from '../../utils/TrailSearch';


const Search = () => {
    const trailSearch = () => {
        const location = document.getElementById('loc').value.trim();

        searchTrail(location);
    }

    return (
        <InputGroup className="mt-5" onSubmit={trailSearch}>
            <Form.Control
            placeholder="Search for a Song"
            aria-label="Search for a Song"
            id="loc"
            />
            <Button variant="info"type='submit'>
            Search
            </Button>
        </InputGroup>        
    )
}

export default Search;