const mongoose = require('mongoose');

const lectureTopicSchema = mongoose.Schema({
    class : String,
    stream : String,
    subject : String,
    lectureTopicId : String,
    lectureTopicName : String
});

const lectureTopicModel = mongoose.model('LectureTopics', lectureTopicSchema);

module.exports = lectureTopicModel;