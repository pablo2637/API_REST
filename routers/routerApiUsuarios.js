const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateInputs } = require('../middleware/validarInputs');
const { validateJWT } = require('../middleware/validarJwt')

const {
    postNewUser,
    postUserLogin,
    getRenew } = require('../controllers/apiControllerUsuario')

//Login
router.post('/', [
    check('email', 'El email es obligatorio').trim().isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty().trim(),
    validateInputs
], postUserLogin);


//Registro
router.post('/new', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty().trim(),
    check('isAdmin', 'Debe especificar si el usuario es administrador.').not().isEmpty().isBoolean(),
    check('password', 'La contraseña es obligatoria y debe tener entre 6 y 10 caracteres.').not().isEmpty().trim().isLength({ min: 6, max: 10 }),
    check('email', 'El email es obligatorio, por favor, verifícalo.').trim().isEmail().normalizeEmail(),
    validateInputs
], postNewUser);

//Renew token
router.get('/renew', validateJWT, getRenew)

module.exports = router;