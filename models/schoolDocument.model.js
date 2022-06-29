const mongoose = require('mongoose');

const schoolDocumentSchema = mongoose.Schema({
    schoolId : String,
    type : String,
    title : String,
    url : String,
    createdTime : {
        type : Number,
        default : Date.now
    }
});

const schoolDocumentModel = mongoose.model('SchoolDocument', schoolDocumentSchema);

module.exports = schoolDocumentModel;