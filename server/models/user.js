var mongoose = require ('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var schema = mongoose.schema;

var userSchema = new schema ({
    email: String,
    firstName: String,
    lastName: String,
    password: String
});

module.exports = mongoose.model('user', userSchema);
