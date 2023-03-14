const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');

const { generateJwt } = require('../helpers/jwt')

//Login usuario
const postUserLogin = async ({ body }, res) => {
    try {
        console.log('Login user post request', body);

        const usuario = await Usuario.findOne({ "email": body.email })
        if (!usuario) return res.status(403).json({
            ok: false,
            msg: `postUsuarioLogin: El email ${body.email} no esta registrado en la bbdd.`,
        })

        const passwordOk = bcrypt.compareSync(body.password, usuario.password)
        if (!passwordOk) return res.status(401).json({
            ok: false,
            msg: 'postUsuarioLogin: el usuario/contraseña no corresponden a los datos almacenados.',
        })

        return res.status(200).json({
            ok: true,
            msg: 'postUsuarioLogin: datos correctos.',
            data: usuario
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'postUsuarioLogin: fallo al intentar buscar el usuario.',
            error
        })
    }
}


//Nuevo usuario
const postNewUser = async ({ body }, res) => {
    try {
        console.log('New user post request: ', body);

        const yaExiste = await Usuario.findOne({ "email": body.email })
        if (yaExiste) return res.status(403).json({
            ok: false,
            msg: `postUsuarioNuevo: no es posible crear el usuario. El email ${body.email} ya esta en uso.`,
        })

        const usuario = new Usuario(body);
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(body.password, salt);

        await usuario.save();
        const token = await generateJwt(usuario.id, usuario.nombre)

        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'postUsuarioNuevo: Ha habido un fallo al crear el usuario.',
            error
        })
    }
}

//Renew token
const getRenew = async (req, res) => {
    const token = await generateJwt(req.uid, req.nombre);
    return res.status(200).json({
        ok: true,
        msg: 'getRenew: renovación del token correcta.',
        token
    })
}

module.exports = {
    postUserLogin,
    postNewUser,
    getRenew
}