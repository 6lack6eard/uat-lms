const mongoose = require('mongoose');

const userRegisterSchema = mongoose.Schema({
    stream: String,
    course: String,
    name: String,
    father: String,
    mother: String,
    fatherOccp: String,
    motherOccp: String,
    dob: Date,
    gender: String,
    bloodGrp: String,
    category: String,
    nationality: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    pmobile: String,
    mobile: String,
    email: String,
    school: String,
    schoolAddress: String,
    perClass: String,
    perPCM: String,
    perPCB: String,
    gradeScience: String,
    gradeMaths: String,
    examBoard: String,
    image: String

});

const userRegisterModel = mongoose.model('UserRegisters', userRegisterSchema);

module.exports = userRegisterModel;