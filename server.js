const express = require('express');
// const client = require('./client');
//Require models
// const {tracks} = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req, res) => {
//     //models in route
//     tracks.find({}, (err, result) => {
//         if (err) {
//             res.status(500).send({message: 'Error'});
//         }else {
//             res.sendStatus(200).json(result);
//         }
//     });
// });

app.listen(PORT, () => {
    console.log(`API server running on ${PORT}`)
});