const { Schema, model } = require('mongoose');

const ProductoSchema = new Schema({
    tipo: String,
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    imagen: String,
    precio: Number,
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Producto', ProductoSchema)