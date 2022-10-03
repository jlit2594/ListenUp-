var acctController = function (userModel, session, mailer){
    this.api = require ('../models/api');
    this.apiReply = require ('../models/api-reply');
    this.userProfile = require ('../models/user-profile');

    this.userModel = userModel;
    this.session =session;
    this.mailer = mailer;

};

module.exports = acctController;