const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const { validateInputs } = require('../middleware/validarInputs');

const {
    getProductos,
    getProductosCategoria,
    getProducto,
    postProducto,
    scrapAndPostProductos,
    putProducto,
    deleteProducto } = require('../controllers/apiControllersProductos')

//Todos
router.get('/productos/', getProductos);

//Todos x Categoria
router.get('/productos/categoria/:categoria', getProductosCategoria);

//Uno
router.get('/productos/id/:id', getProducto);

//Crear
router.post('/productos/', [
    check('tipo', 'El tipo es obligatorio.').not().isEmpty().trim(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty().trim(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty().trim(),
    check('precio', 'El precio es obligatorio').not().isEmpty().isNumeric(),
    validateInputs],
    postProducto);

//Modificar
router.put('/productos/id/:id', [
    check('tipo', 'El tipo es obligatorio.').not().isEmpty().trim(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty().trim(),
    check('imagen', 'La imagen es obligatoria').not().isEmpty().trim(),
    check('precio', 'El precio es obligatorio').not().isEmpty().isNumeric(),
    validateInputs],
    putProducto);

//Scrapping
router.get('/scrap', scrapAndPostProductos);

//Borrar
router.delete('/productos/id/:id', deleteProducto);

module.exports = router;