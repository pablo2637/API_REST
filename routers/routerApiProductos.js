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
    deleteProducto } = require('../controllers/apiControllersProductos');


//Todos
router.get('/', getProductos);


//Todos x Categoria
router.get('/categoria/:categoria', getProductosCategoria);


//Uno
router.get('/id/:id', getProducto);


//Crear
router.post('/', [
    check('tipo', 'El tipo es obligatorio').trim().not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').trim().not().isEmpty(),
    check('precio', 'El precio es obligatorio').trim().not().isEmpty(),
    validateInputs],
    postProducto);


//Modificar
router.put('/id/:id', [
    check('tipo', 'El tipo es obligatorio').trim().not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').trim().not().isEmpty(),
    check('precio', 'El precio es obligatorio').trim().not().isEmpty(),
    validateInputs],
    putProducto);


//Scrapping
router.get('/scrap', scrapAndPostProductos);


//Borrar
router.delete('/id/:id', deleteProducto);


module.exports = router;