const mongoose = require('mongoose');

const lectureTeacherSchema = mongoose.Schema({
    lectureTeacherId : String,
    lectureTeacherCode : String,
    lectureTeacherName : String,
    lectureTeacherDetail : String,
    lectureTeacherIsDeleted : { 
        type: Boolean, 
        default: false 
    }
});

const lectureTeacherModel = mongoose.model('LectureTeachers', lectureTeacherSchema);

module.exports = lectureTeacherModel;