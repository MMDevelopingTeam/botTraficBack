const mongoose = require('mongoose');

const HeadquartersSchema = new mongoose.Schema(
    {
        nameHeadquarter: { type: String, maxlength: 45 },
        telephoneNumber: { type: String, maxlength: 30 },
        addressHQ: {type: String, maxlength: 45 },
        company_idCompany: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'company_idCompany' }
    }
)

module.exports = mongoose.model('Headquarters', HeadquartersSchema)