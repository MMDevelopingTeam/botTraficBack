const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateCreateModel = [
    check('nickname', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('isAllowed', 'El campo es de tipo boolean')
    .exists()
    .isBoolean(),
    check('isActive', 'El campo es de tipo boolean')
    .exists()
    .isBoolean(),
    check('platforms_idPlatform', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('headquarters_idHeadquarter', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
const validateGetPlatform = [
    check('nickname', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateGetPlatform, validateCreateModel}