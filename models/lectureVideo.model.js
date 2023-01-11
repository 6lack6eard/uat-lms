const mongoose = require('mongoose');

const lectureVideoSchema = mongoose.Schema({
    lectureVideoId : String,
    class : String,
    stream : String,
    subject : String,
    lectureTopicId : String,
    lectureTeacherId : String,
    videoLink : String
});

const lectureVideoModel = mongoose.model('LectureVideos', lectureVideoSchema);

module.exports = lectureVideoModel;