const mongoose = require('mongoose');

const batchMstSchema = mongoose.Schema({
    id: String,
    type: String,
    name: String,
    status: {
        type: Boolean,
        default: true
    }
});

const batchMstModel = mongoose.model('BatchMst', batchMstSchema);

module.exports = batchMstModel;