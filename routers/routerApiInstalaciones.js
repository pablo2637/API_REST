const express = require('express');
const router = express.Router();

const { getInstalacion } = require('../controllers/apiControllerInstalaciones');


router.get('/id/:id', getInstalacion);


module.exports = router;