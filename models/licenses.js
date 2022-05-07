const mongoose = require('mongoose');

const LicensesSchema = new mongoose.Schema(
    {
        initialDateLicense: {type: Date, required: true},
        finishedDateLicense: {type: Date},
        nameLicense: {type: String, maxlength: 45, required: true},
        descriptionLicense: {type: String, maxlength: 200}
    }
)

module.exports = mongoose.model('Licenses', LicensesSchema)