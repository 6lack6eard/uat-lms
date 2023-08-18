const mongoose = require('mongoose');

const userTopicQuestionSchema = mongoose.Schema({
    userId : String,
    topicId : String,
    latestVideoCount : String,
    totalTime : String,
    playedTime : String,
    testAttempt : Boolean
});

const userTopicModel = mongoose.model('UserTopics', userTopicQuestionSchema);

module.exports = userTopicModel;