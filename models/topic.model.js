const mongoose = require('mongoose');

const topicSchema = mongoose.Schema({
    courseId : String,
    subjectId : String,
    topicId : String,
    topicName : String,
    videoList : [String],
    documentList : [String]
});

const topicModel = mongoose.model('Topics', topicSchema);

module.exports = topicModel;