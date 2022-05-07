const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
    {
        nameCompany: {type: String, required: true},
        licenses_idLicenses: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'licenses_idLicenses' }
    }
)

module.exports = mongoose.model('Company', CompanySchema)