const { check } = require('express-validator')
const { validateResult } = require('../utils/validateHelper')

const validateCreateSignIn = [
    check('email', 'El campo es de tipo email')
    .exists()
    .isEmail(),
    check('password', 'El password es de minimo 6 caracteres')
    .exists()
    .isLength({min: 6}),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateCreateSignUp = [
    check('username', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('email', 'El campo es de tipo email')
    .exists()
    .isEmail(),
    check('password', 'El password es de minimo 6 caracteres')
    .exists()
    .isLength({min: 6}),
    check('userType_idUserType', 'El campo es requerido')
    .exists()
    .notEmpty(),
    check('headquarters_idHeadquarter', 'El campo es requerido')
    .exists()
    .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = {validateCreateSignIn, validateCreateSignUp}