const searchTrail = (location) => {
    var axios = require('axios');

    var config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=hiking%20trails%20in%20' + location + 'key=' + process.env.API_KEY,
        headers: { }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = searchTrail;