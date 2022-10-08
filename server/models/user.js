var mongoose = require ('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var saltRounds = 10;

var schema = mongoose.schema;

var userSchema = new schema ({
    email: String,
    firstName: String,
    lastName: String,
    password: String
});

userSchema.pre('save', function( next ) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash
                next()
            })
        })
    }else {
        next()
    }
});



const User = mongoose.model('User', userSchema);
module.exports = { User }
