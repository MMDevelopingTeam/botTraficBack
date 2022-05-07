const mongoose = require('mongoose');

const ModelsSchema = new mongoose.Schema(
    {
        nickname: {type: String, maxlength: 45, required: true},
        platform: {type: String, maxlength: 45, required: true},
        isAllowed: {type: Boolean, required: true},
        isActive: {type: Boolean, default: true},
        headquarters_idHeadquarter: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'headquarters_idHeadquarter' }
    }
)

module.exports = mongoose.model('Models', ModelsSchema)