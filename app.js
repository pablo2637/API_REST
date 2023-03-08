const express = require('express');

//configurar servidor
const app = express();
const port = process.env.PORT || 3000;

//establece carpeta static
app.use(express.static(__dirname + '/public'));

//establecer template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//rutas
app.use('/', require('./routers/routerFront'));

//404
app.use((req, res, next) => {
    res.status(404).render('404', {
        error: '404',
        msg: 'Página no encontrada.'
    })

})

//Listener
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port}`);
})
