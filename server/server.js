const express = require('express');
const cors = require("cors");

const { ApolloServer } = require('apollo-server-express');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
    // stuff
});

const app = express();
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.set("port", process.env.PORT || 3001);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(postRoutes);

const start ApolloServer = async () => {
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
module.exports = server;
