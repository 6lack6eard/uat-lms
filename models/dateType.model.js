const mongoose = require('mongoose');

const dateTypeSchema = mongoose.Schema({
    date : String,
    type : String
});

const dateTypeModel = mongoose.model('DateType', dateTypeSchema);

module.exports = dateTypeModel;