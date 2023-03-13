const Usuario = require('../models/usuarioModel');

const getUsuario = async ({ params }, res) => {
    try {
        console.log('user get request, id: ', params.id);
        const usuario = await Usuario.findById(params.id);
        if (usuario) return res.status(200).json({
            ok: true,
            msg: 'getUsuario: se ha encontrado el usuario.',
            data: usuario
        })
        else return res.status(404).json({
            ok: true,
            msg: 'getUsuario: NO se ha encontrado el usuario con id: ' + params.id,
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'getUsuario: fallo al intentar buscar el usuario.',
            error
        })
    }
}

const postUsuario = async ({ body }, res) => {
    try {
        console.log('user post request: ', body);

        const usuario = await new Usuario(body).save();
        return res.status(201).json({
            ok: true,
            msg: 'postUsuario: el usuario se ha creado con éxito.',
            data: usuario
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'postUsuario: Ha habido un fallo al crear el usuario.',
            error
        })
    }
}

module.exports = {
    getUsuario,
    postUsuario
}