const express = require('express');
const router = express.Router();

const {
    getProductos,
    getProducto,
    postProducto,
    scrapAndPostProductos,
    getProductosCategoria,
    deleteProducto } = require('../controllers/apiControllers')

//Todos
router.get('/productos', getProductos);

//Todos x Categoria
router.get('/productos/categoria/:categoria', getProductosCategoria);

//Uno
router.get('/productos/id/:id', getProducto);

//Crear
router.post('/productos/', postProducto);

//Modificar
router.put('/productos/:id',);

//Admin
router.get('/admin', scrapAndPostProductos);

//Borrar
router.delete('/productos/id/:id', deleteProducto);

module.exports = router;