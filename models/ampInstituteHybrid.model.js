const mongoose = require('mongoose');

const ampInstituteHybridSchema = mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    mobile: String,
    contactPersonName: String,
    contactPersonMobile: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    natureOfInstitute: String,
    infrastrucuture: String,
    board: String,
    paymentStatus: Boolean

});

const ampInstituteHybridModel = mongoose.model('AmpInstituteHybrid', ampInstituteHybridSchema);

module.exports = ampInstituteHybridModel;