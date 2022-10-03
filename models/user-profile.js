var createUserProfile = function (response){

    this.email = response.email,
    this.firstName = response.firstName;
    this.lastName = response.lastName
};

module.exports = createUserProfile;