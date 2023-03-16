const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateInputs } = require('../middleware/validarInputs');

const {
    getServicios,
    getServicio,
    postServicio,
    putServicio,
    deleteServicio } = require('../controllers/apiControllerServicios')

//Todos
router.get('/', getServicios);

//Uno
router.get('/id/:id', getServicio);

//Crear
router.post('/', [
    check('servicio', 'El servicio es obligatorio.').not().isEmpty().trim(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty().trim(),
    validateInputs],
    postServicio);

//Modificar
router.put('/id/:id', [
    check('servicio', 'El servicio es obligatorio.').not().isEmpty().trim(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty().trim(),
    validateInputs],
    putServicio);

//Borrar
router.delete('/id/:id', deleteServicio);

module.exports = router;