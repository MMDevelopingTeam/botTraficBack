const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateCreateUserType = [
    check('nameUserType', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('descriptionUserType', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
const validateCreateUserTypeHasP = [
    check('permissions_idPermissions', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('userType_idUserType', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]
const validateCreateUserTypeHas = [
    check('user_idUser', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('userType_idUserType', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreateUserType, validateCreateUserTypeHasP, validateCreateUserTypeHas}