const getIndex = (req, res) => {
    res.render('index', {
        titulo: 'Estas en el INDEX.',
        tituloURL: 'Index'
    });
}

const getProductos = (req, res) => {
    res.render('productos', {
        titulo: 'Estas en PRODUCTOS.',
        tituloURL: 'Productos'
    });
}

const getServicios = (req, res) => {
    res.render('servicios', {
        titulo: 'Estas en SERVICIOS.',
        tituloURL: 'Servicios'
    });
}

const getQuienesSomos = (req, res) => {
    res.render('quienessomos', {
        titulo: 'Estas en QUIENES SOMOS.',
        tituloURL: 'Quienes Somos'
    });
}

const getContacto = (req, res) => {
    res.render('contacto', {
        titulo: 'Estas en CONTACTO.',
        tituloURL: 'Contacto'
    });
}

module.exports = {
    getIndex,
    getProductos,
    getServicios,
    getQuienesSomos,
    getContacto
}

