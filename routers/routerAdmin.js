const express = require('express')
const router = express.Router();

const { validateUser } = require('../middleware/validarUser')
const {
    showDashboard,
    getServicio, putServicio, deleteServicio, postServicio, newServicio,
    checkUser,
    getProducto, putProducto, deleteProducto, postProducto, newProducto
} = require('../controllers/frontControllersAdmin')


//Dashboard
router.get('/', validateUser, showDashboard)

//Check User
router.post('/checkUser', checkUser)



//Get Servicio
router.get('/servicios/id/:id', getServicio)

//Nuevo Servicio
router.get('/servicios/new', newServicio)

//Put Servicio
router.post('/servicios/updt/:id', putServicio)

//Post Servicio
router.post('/servicios/post/', postServicio)

//Delete Servicio
router.get('/servicios/dlt/:id', deleteServicio)



//Get Producto
router.get('/productos/id/:id', getProducto)

//Nuevo Producto
router.get('/productos/new', newProducto)

//Put Producto
router.post('/productos/updt/:id', putProducto)

//Post Producto
router.post('/productos/post/', postProducto)

//Delete Producto
router.get('/productos/dlt/:id', deleteProducto)

module.exports = router;