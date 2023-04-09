const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { conexion } = require('./helpers/dbConnect')

const app = express();                              //Servidor
const port = process.env.PORT;

app.use(cors());                                    //Cors
app.use(express.static(__dirname + '/public'));     //Carpeta static

app.set('view engine', 'ejs');                      //Template engine
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }))    // Parse application/x-www-form-urlencoded
app.use(express.json())                             // Parse application/json

conexion();                                         //Conexión


app.use('/', require('./routers/routerFront'));     //Rutas
app.use('/api/v1/productos', require('./routers/routerApiProductos'));
app.use('/api/v1/servicios', require('./routers/routerApiServicios'));
app.use('/api/v1/usuarios', require('./routers/routerApiUsuarios'));
app.use('/api/v1/instalaciones', require('./routers/routerApiInstalaciones'));
app.use('/dashboard', require('./routers/routerAdmin'));


//404
app.use((req, res, next) => {

    res.status(404).render('404', {
        tituloURL: '404 - Página no encontrada',
        error: '404',
        msg: 'Página no encontrada.'
    });
    
});


//Listener
app.listen(port, () => console.log(`Server listening on port ${port}...`))