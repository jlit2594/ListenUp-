var api= function (response){

    //indicates successful login or not
    this.success = response.success;

    //returns notes on why login unsuccessful
    this.reply = response.reply;
};

module.exports =api;