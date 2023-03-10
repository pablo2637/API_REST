// const Producto = require('../models/instalacionModel');
const Producto = require('../models/productosModel');
const searchWeb = require('../helpers/scrapping');

const getProductos = async (req, res) => {
    try {
        console.log('get request: all');
        const productos = await Producto.find();
        return res.status(200).json({
            ok: true,
            msg: 'getProductos: recuperando todos los productos.',
            productos
        })

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Error getProductos: fallo al intentar recuperar todos los productos',
            error
        })
    }
}

const scrapAndPostProductos = async (req, res) => {
    try {

        const piscinas = await searchWeb('https://www.bricodepot.es/jardin/piscina/piscinas', 'piscinas');
        const barbacoas = await searchWeb('https://www.bricodepot.es/jardin/mobiliario-y-sombreo/barbacoas?cat=3204', 'barbacoas');
        const mobiliario = await searchWeb('https://www.bricodepot.es/jardin/mobiliario-y-sombreo/muebles/conjuntos-mesas-sillas-jardin?', 'mobiliario');
        const newArray = [].concat(piscinas, barbacoas, mobiliario)

        const response = await Producto.insertMany(newArray);
        return res.status(201).json({
            ok: true,
            msg: 'postProductos: creado un nuevo producto.',
            response
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error postProductos: fallo al intentar crear un producto.',
            error
        })
    }
};

const getProducto = async ({ params }, res) => {
    try {
        console.log('get request: id ', params.id);
        const producto = await Producto.findById(params.id);
        if (producto) return res.status(200).json({
            ok: true,
            msg: 'getProducto: se ha encontrado el producto.',
            producto
        })
        else return res.status(404).json({
            ok: false,
            msg: 'getProducto: no existe ningún producto con el ObjectId(' + params.id + ')'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error getProducto: fallo al intentar buscar un producto.',
            error
        })
    }
}

const postProducto = async (req, res) => {
    try {
        console.log('post request: ', req.body);
        const response = await Producto(req.body).save()
        return res.status(201).json({
            ok: true,
            msg: 'postProductos: creado un nuevo producto.',
            response
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error postProductos: fallo al intentar crear un producto.',
            error
        })
    }
}

const deleteProducto = async ({ params }, res) => {
    try {
        console.log('delete request: id ', params.id);
        const producto = await Producto.findByIdAndDelete(params.id);
        if (producto) return res.status(200).json({
            ok: true,
            msg: 'deleteProducto: se ha borrado el producto.',
            producto
        })
        else return res.status(404).json({
            ok: false,
            msg: 'deleteProducto: no existe ningún producto con el ObjectId(' + params.id + ')'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error getProducto: fallo al intentar buscar un producto.',
            error
        })
    }
}

module.exports = {
    getProductos,
    getProducto,
    postProducto,
    deleteProducto,
    scrapAndPostProductos
}