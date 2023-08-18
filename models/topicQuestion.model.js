const mongoose = require('mongoose');

const topicQuestionSchema = mongoose.Schema({
    topicQuestionId : String,
    topicId : String,
    question : String,
    opt1 : String,
    opt2 : String,
    opt3 : String,
    opt4 : String,
    answer : String
});

const topicQuestionModel = mongoose.model('TopicQuestion', topicQuestionSchema);

module.exports = topicQuestionModel;