import logo from './logo.svg';
import './App.css';
import { response } from 'express';


const CLIENT_ID = "42b5cbcff9c34efabc056823774401bf";
const CLIENT_SECRET = "77810e46bd594e1486574e8b739e50fb";
//running API once
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState("");

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

  //Search
  async function search() {
    console.log("Search for " + searchInput);

    //Get request using search to get artist id
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=', + searchInput + '&type=artist', searchParameters)
    .then(data => {return data.artists.items[0].id })
    console.log("Artist ID is " + artistID);
    //get request with artist id grab all the albums from that artist
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=albums&market=US&limit=50', searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setAlbums(data.items);
    });
    //display albums to the user
  }
  console.log(albums);

  return (
    <div className="App">
      <Container>
        <InputGroup className="mb-3" size="1g">
          <formControl
          placeholder="Search for artist"
          type="input"
          onKeyPress={event => {
            if(event.key == "Enter") {
              search();
            }
          }}
          onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <Container>
        <Row className="mx-2 row-cols-4">
          {albums.map((album, i) => {
            console.log(album);
            return(<Card>
            <Card.Img src={album.images[0].url}/>
            <Card.Body>
              <Card.Title>{album.name}</Card.Title>
            </Card.Body>
          </Card>
          )
          })}
          
        </Row>
      </Container>
    </div>
  );
}

export default App;
