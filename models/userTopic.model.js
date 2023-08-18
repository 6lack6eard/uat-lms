const mongoose = require('mongoose');

const userTopicSchema = mongoose.Schema({
    userId : String,
    topicId : String,
    latestVideoCount : String,
    totalTime : String,
    playedTime : String,
    testAttempt : Boolean
});

const userTopicModel = mongoose.model('UserTopics', userTopicSchema);

module.exports = userTopicModel;