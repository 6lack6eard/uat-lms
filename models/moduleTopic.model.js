const mongoose = require('mongoose');

const moduleTopicSchema = mongoose.Schema({
    moduleId : String,
    subjectId : String,
    topicId : String,
    topicName : String,
    questionList : [{
        questionId : String,
        videoId : String,
        note : String
    }]
});

const moduleTopicModel = mongoose.model('ModuleTopics', moduleTopicSchema);

module.exports = moduleTopicModel;