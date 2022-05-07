const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, maxlength: 45 },
        username: { type: String, required: true, maxlength: 45 },
        email: { type: String, required: true, unique: true, maxlength: 150 },
        password: { type: String, required: true, maxlength: 45 },
        userType_idUserType: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userType_idUserType' },
        headquarters_idHeadquarter: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'headquarters_idHeadquarter' }
    }
)

module.exports = mongoose.model('User', UserSchema)