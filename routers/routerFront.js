const express = require('express');
const router = express.Router();

const { getIndex,
    getProductos,
    getServicios,
    getInstalacion,
    getQuienesSomos,
    getContacto } = require('../controllers/frontControllers');

//Home
router.get('/', getIndex);

//Productos
router.get('/productos', getProductos);

//Servicios
router.get('/servicios', getServicios);

//Instalación
router.get('/instalacion', getInstalacion);

//Quienes Somos
router.get('/quienessomos', getQuienesSomos);

//Contacto
router.get('/contacto', getContacto);


module.exports = router;