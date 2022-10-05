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
        <InputGroup className="mb-3" onSubmit={trailSearch}>
            <Form.Control
            placeholder="Search for a Location"
            aria-label="Search for a Location"
            id="loc"
            />
            <Button variant="btn btn-primary"type='submit'>
            Search
            </Button>
        </InputGroup>        
    )
}

export default Search;