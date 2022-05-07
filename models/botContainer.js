const mongoose = require('mongoose');

const BotContainerSchema = new mongoose.Schema(
    {
        ip: {type: String, maxlength: 45, unique: true, required: true},
        typeBot: {type: String, maxlength: 45},
        descriptionBot: {type: String, maxlength: 100},
        latBot: {type: String, maxlength: 10},
        lonBot: {type: String, maxlength: 10},
        addressBot: {type: String, maxlength: 45},
        averageDownloadSpeed: {type: String, maxlength: 45},
        averageUploadSpeed: {type: String, maxlength: 45},
        isp: {type: String, maxlength: 90}
    }
)

module.exports = mongoose.model('BotContainer', BotContainerSchema)