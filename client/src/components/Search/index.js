import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { response } from 'express';

const Search = () => {
    const [searchKey, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [artists, setArtists] = useState([]);


    const CLIENT_ID = "42b5cbcff9c34efabc056823774401bf";
    const CLIENT_SECRET = "77810e46bd594e1486574e8b739e50fb";

    useEffect(() => {
        //API access token
        var authParameters = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
      },[])

//       //Search
//     async function search() {
//     console.log("Search for " + searchInput);

//     //Get request using search to get artist id
//     var searchParameters = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + accessToken
//       }
//     }
//     var artistID = await fetch('https://api.spotify.com/v1/search?q=', + searchInput + '&type=artist', searchParameters)
//     .then(data => {return data.artists.items[0].id })
//     console.log("Artist ID is " + artistID);
//     //get request with artist id grab all the albums from that artist
//     var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=albums&market=US&limit=50', searchParameters)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       setAlbums(data.items);
//     });
//     //display albums to the user
//   }
//   console.log(albums);

    const searchArtists = async (event) => {
        event.preventDefault();
        try {
            const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        }) 

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`)
        }

        const result = await response.json
        console.log(result)

        } catch (err) {
            console.log(err)
        }
      

        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     setArtists(data.artists.items)
        // })
    }

    return (
        <InputGroup className="mt-5">
            <Form.Control
            placeholder="Search for a Artist"
            aria-label="Search for a Artist"
            type='input'
            id="loc"
            onClick={searchArtists}
              onChange={event => setSearchInput(event.target.value)}
            />
            <Button variant="info"type='submit'>
            Search
            </Button>
        </InputGroup>        
    )
}

export default Search;