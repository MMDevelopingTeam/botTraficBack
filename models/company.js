const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
    {
        nameCompany: {type: String, required: true, maxlength:40},
        typeCompany: {type: String, required: true, maxlength:45},
        addressCompany: {type: String, maxlength:45},
        telephoneCompany: {type: String, maxlength:25},
        logo: {type: String, maxlength:100},
        isConfigFull: {type: Boolean, default: false},
        registerLicensesArray: [{type: mongoose.Schema.Types.ObjectId, ref: 'RegisterLicenses', autopopulate: true}]
    }
)

CompanySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Company', CompanySchema)