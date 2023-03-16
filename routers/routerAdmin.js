const express = require('express')
const router = express.Router();

const {
    showDashboard,
    getServicio,
    putServicio,
    deleteServicio,
    postServicio,
    newServicio,
    checkUser } = require('../controllers/frontControllersAdmin')

//Dashboard
router.get('/', showDashboard)

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

module.exports = router;