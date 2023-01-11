const mongoose = require('mongoose');

const ampStudentSchema = mongoose.Schema({
    userId: String,
    name: String,
    fname: String,
    mobile: String,
    email: String,
    dob: Date,
    city: String,
    state: String,
    class: String,
    school: String,
    aadharno: String,
    paymentStatus: Boolean
});

const ampStudentModel = mongoose.model('AmpStudent', ampStudentSchema);

module.exports = ampStudentModel;