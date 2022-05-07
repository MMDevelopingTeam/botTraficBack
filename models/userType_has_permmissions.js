const mongoose = require('mongoose');

const UserType_has_permissionsSchema = new mongoose.Schema(
    {
        permissions_idPermissions: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'permissions_idPermissions' },
        userType_idUserType: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userType_idUserType' }
    }
)

module.exports = mongoose.model('UserType_has_permissions', UserType_has_permissionsSchema)