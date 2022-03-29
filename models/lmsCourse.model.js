const mongoose = require('mongoose');

const lmsCourseSchema = mongoose.Schema({
    cId: String,
    cType: String,
    cName: String,
    cExpiry: String,
    cStatus: String,
    cSubject: [String],
    cSubjectDetail1: [String],
    cSubjectDetail2: [String],
    cSubjectDetail3: [String]

});

const lmsCourseModel = mongoose.model('LmsCourses', lmsCourseSchema);

module.exports = lmsCourseModel;