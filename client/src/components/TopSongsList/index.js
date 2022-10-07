import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

const TopSongsList = ({ songs }) => {
    if (!songs.length) {
        return <h3>Oops! We did it again!</h3>
    }

    return (
        <div>
            <h3>Today's Top Songs</h3>
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
}

export default TopSongsList;