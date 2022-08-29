const mongoose = require('mongoose');

const AccessLogSchema = new mongoose.Schema(
    {
        loginDate: {type: Date, default: Date.now, required: true},
        user: { type: String, maxlength: 45 },
        mac: { type: String, maxlength: 45 },
        userAgent: { type: String, maxlength: 45 },
        hadAccess: { type: String, maxlength: 45 },
        User_idUser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User_idUser' }
    }
)

module.exports = mongoose.model('AccessLog', AccessLogSchema)