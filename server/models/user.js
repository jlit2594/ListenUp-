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

userSchema.methods.generateTokens - function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')

    user.token = token;
    user.save(function (err, user) {
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function(err, decode) {
        user.findOne({"_id":decode, "token": token}, function(err, user) {
            if(err) return cd(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);
module.exports = { User }
