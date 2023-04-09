const { Schema, model } = require('mongoose');


const ProductoSchema = new Schema({
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,        
    },
    precio: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
});


module.exports = model('Producto', ProductoSchema)