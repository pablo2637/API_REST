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
app.get( '/', (req, res) => {
    res.render('index', {
        titulo: 'Estas en el INDEX.'
    });
})

app.get('/productos', (req, res) => {
    res.render('productos', {
        titulo: 'Estas en PRODUCTOS.'
    });
})

app.get('/servicios', (req, res) => {
    res.render('servicios', {
        titulo: 'Estas en SERVICIOS.'
    });
})

app.get('/quienessomos', (req, res) => {
    res.render('quienessomos', {
        titulo: 'Estas en QUIENES SOMOS.'
    });
})
app.get('/contacto', (req, res) => {
    res.render('contacto', {
        titulo: 'Estas en CONTACTO.'
    });
})

//Listener
app.listen(port, () => {
    console.log(`Servidor a la escucha del puerto ${port}`);
})
