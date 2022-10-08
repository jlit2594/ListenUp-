const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userForm: {
        type: Schema.Type.Objectid,
        ref: 'User'
    },
    songId:{
        type: String
    },
    songTitle:{
        type: String
    }
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }