const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateCreateHeadquarter = [
    check('location', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('company_idCompany', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('botsContainer_idBot', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreateHeadquarter}