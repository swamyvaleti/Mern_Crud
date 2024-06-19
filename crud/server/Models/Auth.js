const mongoose = require('mongoose');

let RegisterUser = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    confirmpassword: String
})

// RegisterUser is a Schema that we have been created

module.exports = mongoose.model('RegisterUser', RegisterUser)