const mongoose = require('mongoose');

const neetUsersSchema = mongoose.Schema({
    name: String,
    father: String,
    mother: String,
    dob: String,
    enroll: String,
    mobile: String,
    email: String,
    roll: String,
    admitCardImg: String,
    exam: String
});

const neetUsersModel = mongoose.model('NeetUsers', neetUsersSchema);

module.exports = neetUsersModel;