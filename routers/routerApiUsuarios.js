const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateInputs } = require('../middleware/validarInputs');

const { getUsuario, postUsuario } = require('../controllers/apiControllerUsuario')

router.get('/usuarios/:id', getUsuario);

router.post('/usuarios/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim(),
    check('isAdmin', 'Debe especificar si el usuario es administrador.').not().isEmpty().isBoolean(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty().trim(),
    check('email', 'El email es obligatorio.').not().isEmpty().trim().isEmail().normalizeEmail(),
    validateInputs
], postUsuario);

module.exports = router;
