const Instalacion = require('../models/instalacionModel')


const getInstalacion = async ({ params }, res) => {

    try {

        const instalacion = await Instalacion.findById(params.id);

        if (!instalacion)
            return res.status(404).json({
                ok: false,
                msg: 'getInstalacion: no se ha encontrado la instalacion.'
            });

        return res.status(200).json({
            ok: false,
            msg: 'getInstalacion: se ha encontrado la instalacion.',
            data: instalacion
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'getInstalacion: error al buscar una instalacion.'
        });

    };
};


module.exports = { getInstalacion }