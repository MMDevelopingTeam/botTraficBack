const mongoose = require('mongoose');

const UserTypeSchema = new mongoose.Schema(
    {
        nameUserType: {type: String, maxlength: 45, required: true},
        descriptionUserType: {type: String, maxlength: 45, required: true}
    }
)

module.exports = mongoose.model('UserType', UserTypeSchema)