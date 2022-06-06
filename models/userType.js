const mongoose = require('mongoose');

const UserTypeSchema = new mongoose.Schema(
    {
        nameUserType: {type: String, maxlength: 45, required: true},
        descriptionUserType: {type: String, maxlength: 45},
        permissionsArray: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Permissions'}],
    }
)

module.exports = mongoose.model('UserType', UserTypeSchema)