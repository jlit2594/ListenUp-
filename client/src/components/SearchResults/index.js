import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/card';

const SearchResults = ({ albums }) => {
    if (!albums.length) {
        return <h3>Sorry, we couldn't find any pieces of music with that title</h3>
    }

    return (
        <div>
            {albums &&
            albums.map((album, i) => (
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/album/${album._id}`}>{album.title}</Link>
                  </Card.Title>
                  <Card.Text>
                    {album.artist}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
    )
}

export default SearchResults;