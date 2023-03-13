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
router.get('/servicios/', getServicios);

//Uno
router.get('/servicios/id/:id', getServicio);

//Crear
router.post('/servicios/', [
    check('servicio', 'El tipo es obligatorio.').not().isEmpty().trim(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty().trim(),
    validateInputs],
    postServicio);

//Modificar
router.put('/servicios/id/:id', [
    check('servicio', 'El tipo es obligatorio.').not().isEmpty().trim(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty().trim(),
    validateInputs],
    putServicio);

//Borrar
router.delete('/servicios/id/:id', deleteServicio);

module.exports = router;