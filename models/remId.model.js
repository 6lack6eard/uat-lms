const mongoose = require('mongoose');

const remIdSchema = mongoose.Schema({
    remTittle : String,
    remTopicId : Number,
    remSubTopicId : Number,
    remStudentId : Number,
    remSchoolId : Number,
    remModuleTopicId : Number,
    remQuestionId : Number,
    remCrashCourseId : Number,
});

const remIdModel = mongoose.model('RemId', remIdSchema);

module.exports = remIdModel;