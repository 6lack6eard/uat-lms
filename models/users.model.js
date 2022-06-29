const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: String,
    pass: String,
    email: String,
    name: String,
    mobile: String,
    pMobile: String,
    class: String,
    board: String,
    center: String,
    stream: String,
    batchTime: String,
    session: String,
    school: String,
    address: String,
    status: String,
    lmsCourse: [String],
    cbtCourse: [String],
    moduleCourse: [String],
    absentDate: [String],
    lastLogin: Date,
    role: String,

    schoolRefId: String,
    plateformRegegStatus: Boolean

});

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;