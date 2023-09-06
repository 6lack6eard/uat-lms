const mongoose = require('mongoose');

const userNewRegisterSchema = mongoose.Schema({
    name : String,
    father : String,
    mobile : String,
    email : String,
    stream : String,
    promo : String
});

const userNewRegisterModel = mongoose.model('UserNewRegisters', userNewRegisterSchema);

module.exports = userNewRegisterModel;