const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { conexion } = require('./helpers/dbConnect')

//configurar servidor
const app = express();
const port = process.env.PORT;

app.use(cors());

//establece carpeta static
app.use(express.static(__dirname + '/public'));

//establecer template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

//Conexión
conexion();

//rutas
app.use('/', require('./routers/routerFront'));
app.use('/api/v1', require('./routers/routerApi'));

//404
app.use((req, res, next) => {
    res.status(404).render('404', {
        tituloURL: '404 - Página no encontrada',
        error: '404',
        msg: 'Página no encontrada.'
    })

})

//Listener
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port}`);
})
