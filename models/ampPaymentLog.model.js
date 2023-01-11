const mongoose = require('mongoose');

const ampPaymentLogSchema = mongoose.Schema({
    userId: String,
    clientSecret: String,
    log: String,
    createdTime : {
        type : Number,
        default : Date.now
    }
});

const ampPaymentLogModel = mongoose.model('AmpPaymentLog', ampPaymentLogSchema);

module.exports = ampPaymentLogModel;