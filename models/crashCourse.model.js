const mongoose = require('mongoose');

const crashCourseSchema = mongoose.Schema({
    crashCourseId: String,
    crashCourseType: String,
    crashCourseName: String,
    crashCourseSubject: [String],
    crashCourseDes: String,
    crashCoursePrice: String,
    lmsCourseName: String,
});

const crashCourseModel = mongoose.model('CrashCourses', crashCourseSchema);

module.exports = crashCourseModel;