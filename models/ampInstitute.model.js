const mongoose = require('mongoose');

const ampInstituteSchema = mongoose.Schema({
    userId: String,
    name: String,
    email: String,
    contact: String,
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

const ampInstituteModel = mongoose.model('AmpInstitute', ampInstituteSchema);

module.exports = ampInstituteModel;