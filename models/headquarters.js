const mongoose = require('mongoose');

const HeadquartersSchema = new mongoose.Schema(
    {
        location: {type: String, required: true},
        company_idCompany: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'company_idCompany' },
        botsContainer_idBot: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'botsContainer_idBot' }
    }
)

module.exports = mongoose.model('Headquarters', HeadquartersSchema)