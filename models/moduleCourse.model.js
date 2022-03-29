const mongoose = require('mongoose');

const moduleCourseSchema = mongoose.Schema({
    mId: String,
    mType: String,
    mName: String,
    mExpiry: String,
    mStatus: String,
    mSubject: [String]

});

const moduleCourseModel = mongoose.model('ModuleCourses', moduleCourseSchema);

module.exports = moduleCourseModel;