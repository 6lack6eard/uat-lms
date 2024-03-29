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
    remAmpStudentId : Number,
    remAmpInstituteId : Number,
    remAmpInstituteHybridId : Number,
    remBatchId : Number,
    remPromo : String,
});

const remIdModel = mongoose.model('RemId', remIdSchema);

module.exports = remIdModel;