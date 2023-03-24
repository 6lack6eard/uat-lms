const mongoose = require('mongoose');

const batchDateTypeSchema = mongoose.Schema({
    batchId : String,
    date : String,
    type : String
});

const batchDateTypeModel = mongoose.model('BatchDateType', batchDateTypeSchema);

module.exports = batchDateTypeModel;