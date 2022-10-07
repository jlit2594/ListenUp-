var acctController = function (userModel, session, mailer){
    this.api = require ('../models/api');
    this.apiReply = require ('../models/api-reply');
    this.userProfile = require ('../models/user-profile');

    this.userModel = userModel;
    this.session =session;
    this.mailer = mailer;

};

acctController.prototype.getsession = function(){
    return this.session;
};

acctController.prototype.setsession = function () {
    this.session = session;
};


//login
acctController.prototype.logon = function(email, password, callback){

    var me = this;

    me.userModel.findone({ email: email}, function (err, user){
        if (err){
            return callback(err, new me.api ({success: false, reply: {msg: me.apiReply.db_error}}))
        }

        if (user){

            me.password(password, user.password, function (err, password){
                if (password ==user.password){

                    var userProfile = new me.userProfile({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    });
                    me.session.userProfile = userProfile

                    return callback (err, new me.api({
                        success: true, reply: {
                            userProfile: userProfile
                        }
                    }));
                }else{
                    return callback(err, new me.api({ success: false, reply: { msg: me.apiReply.invalid_pwd}}));
                }
            });
        }else{
            return callback (err, new me.api( { success: false, reply: {msg: me.apiReply.email_not_found}}));
        }
    });
};

//log out

acctController. prototype.logoff = function () {
    if ( this.session.userProfile) delete this.session.userProfile;
    return;
};

//register new user

acctController.prototype.createAcct = function (newUser, callback){
    var me = this;
    me.userModel.findone ({email: newUser.email}, function (err, user){
        if (err){
            return callback (err, new me.api({ success: false, reply: {msg: me.apiReply.db_err}}));
        }
        if (user) {
            return callback (err, new me.api ({success: false, reply:{msg: me.apiReply.email_already_exists}}));
        }else{
            newUser.save(function (err, user, number){
                if (err){
                    return callback (err, new me. api({success: false, reply: {msg: me.apiReply.db_err}}));

                    }
                if (number ===1){
                    var userProfile = new me.userProfile({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName

                    });
                    return callback (err, new me.api ({
                        success: true, reply: {userProfile: userProfile}
                    }));
                }else{
                    return callback( err, new me.api ({success: false, reply: {msg: me.apiReply.failed_to_create}}));
                }
                });
            }
        }
)};


module.exports = acctController;