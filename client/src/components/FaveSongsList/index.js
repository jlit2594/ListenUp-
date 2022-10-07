import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/card';

const FaveSongsList = ({ songs, title }) => {
    if (!songs.length) {
        return <h3>There is nothing here yet.</h3>
    }

    return (
        <div>
            <h3>{title}</h3>
            {songs &&
            songs.map(song => (
                <Card>
                    <Card.img>{song.img}</Card.img>
                    <Card.body>
                        <Card.title>
                            <Link to={`/song/${song._id}`}>
                                {song.title}
                            </Link> 
                        </Card.title>
                        <Card.text>
                            {song.artist}
                        </Card.text>
                    </Card.body>
                </Card>
            ))}
        </div>
    )
};

export default FaveSongsList;