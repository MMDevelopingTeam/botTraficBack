const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateCreateLicense = [
    check('initialDateLicense', 'El campo es de tipo fecha YYYY/M/D')
    .exists()
    .notEmpty(),
    check('nameLicense', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreateLicense}