const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    // stuff
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    if (process.env.NODE_ENV === 'production') {
        app.use(ex[ress.static(path.join(__dirname, ''))])
    }

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, ''))
    })


}

startApolloServer();