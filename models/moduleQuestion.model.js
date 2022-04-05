const mongoose = require('mongoose');

const moduleQuestionSchema = mongoose.Schema({
    moduleId : String,
    subjectId : String,
    topicId : String,
    topicName : String,
    questionId : String,
    videoId : String,
    note : String
});

const moduleQuestionModel = mongoose.model('ModuleQuestions', moduleQuestionSchema);

module.exports = moduleQuestionModel;