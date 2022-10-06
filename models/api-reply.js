const api = require("./api");

var apiReply = function () {};
apiReply.prototype.email_not_found =0;
apiReply.prototype.email_already_exists=1;
apiReply.prototype.password_email_mismatch=2;
apiReply.prototype.invalid_pwd=3;
apiReply.prototype.db_error=4;
apiReply.prototype.failed_to_create = 5

module.exports = apiReply;