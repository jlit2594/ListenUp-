import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/card';

const SearchResults = ({ songs }) => {
    if (!songs.length) {
        return <h3>Sorry, we couldn't find any pieces of music with that title</h3>
    }

    return (
        <div>
            {songs &&
            songs.map(song => (
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={song.img} />
                <Card.Body>
                  <Card.Title>
                    <Link to={`/song/${song._id}`}>{song.title}</Link>
                  </Card.Title>
                  <Card.Text>
                    {song.artist}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
    )
}

export default SearchResults;