const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: String,
    pass: String,
    email: String,
    name: String,
    mobile: String,
    class: String,
    center: String,
    stream: String,
    session: String,
    school: String,
    address: String,
    status: String,
    lmsCourse: [String],
    cbtCourse: [String],
    moduleCourse: [String],
    lastLogin: Date,
    role: String

});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;