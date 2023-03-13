const mongoose = require('mongoose');

const conexion = async () => {
    try {
        const respuesta = await mongoose.connect(process.env.URI_CONNECT);
        console.log('Connected to the database...');
        return respuesta;

    } catch (error) {
        return {
            ok: false,
            msg: 'Connecion failure.',
            error
        }
    }
}

module.exports = {
    conexion
}