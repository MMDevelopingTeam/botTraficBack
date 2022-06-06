const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateCreateCompany = [
    check('nameCompany', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('botContainerArray', 'El campo es de tipo Array')
    .exists()
    .isArray(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreateCompany}