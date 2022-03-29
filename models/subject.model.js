const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    subjectId : String,
    subjectName : String
});

const subjectModel = mongoose.model('Subjects', subjectSchema);

module.exports = subjectModel;