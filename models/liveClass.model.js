const mongoose = require('mongoose');

const liveClassSchema = mongoose.Schema({
    courseId : String,
    subjectId : String,
    topic : String,
    teacherName : String,
    startTime : String,
    duration : String,
    description : String,
    link : String
});

const liveClassModel = mongoose.model('LiveClass', liveClassSchema);

module.exports = liveClassModel;