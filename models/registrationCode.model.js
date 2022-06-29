const mongoose = require('mongoose');

const registrationCodeSchema = mongoose.Schema({
    regCodeTittle : String,
    regCode : String
});

const registrationCodeModel = mongoose.model('RegistrationCode', registrationCodeSchema);

module.exports = registrationCodeModel;