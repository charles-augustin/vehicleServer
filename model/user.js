var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocal = require('passport-local-mongoose');

var User = new Schema({
    username: {
        type: String,
        required:true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

User.plugin(passportLocal);

module.exports = mongoose.model('User', User);