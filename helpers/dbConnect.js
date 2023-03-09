const mongoose = require('mongoose');

const conexion = async () => {
    try {
        const respuesta = await mongoose.connect(process.env.URI_CONNECT);
        console.log('Conectado a la base de datos.');
        return respuesta;

    } catch (error) {
        return {
            ok: false,
            msg: 'Error con la conexión.',
            error
        }
    }
}

module.exports = {
    conexion
}