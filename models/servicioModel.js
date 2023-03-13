const { Schema, model } = require('mongoose');

const ServicioSchema = new Schema({
    servicio: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Servicio', ServicioSchema)