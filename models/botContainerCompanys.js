const mongoose = require('mongoose');

const botContainerCompanysSchema = new mongoose.Schema(
    {
        companys_idCompany: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company', autopopulate: true },
        botContainer_idBotContainer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'BotContainer', autopopulate: true},
        registerLicenses: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'RegisterLicenses', autopopulate: true},
        AcctsUsed: {type: Number, required: true},
        AcctsFree: {type: Number, required: true},
    }
)

botContainerCompanysSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('botContainerCompanys', botContainerCompanysSchema)