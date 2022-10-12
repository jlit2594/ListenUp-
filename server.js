const express = require('express');
const client = require('./client/src/App');
//Require models

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/client', (req, res) => )

app.listen(PORT, () => {
    console.log(`API server running on ${PORT}`)
});