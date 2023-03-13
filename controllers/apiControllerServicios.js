const Servicio = require('../models/servicioModel');

const getServicios = async (req, res) => {
    try {
        const limite = parseInt(req.query.limit) || 0;
        let total = 0;

        console.log('get request: all - limit:', limite);
        const servicios = await Servicio.find();
        if (limite > 0 && servicios) {
            total = servicios.length;
            servicios.splice(limite - 1, servicios.length - limite);
        }
        if (servicios) {
            const total_servicios = total > 0 ? total : servicios.length;
            return res.status(200).json({
                ok: true,
                msg: 'getServicios: recuperando todos los servicios.',
                total_servicios,
                limite,
                data: servicios
            })
        }

    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Error getProductos: fallo al intentar recuperar todos los servicios',
            error
        })
    }
}

const getServicio = async ({ params }, res) => {
    try {
        console.log('get request: id ', params.id);
        const servicio = await Servicio.findById(params.id);
        if (servicio) return res.status(200).json({
            ok: true,
            msg: 'getServicio: se ha encontrado el servicio.',
            data: servicio
        })
        else return res.status(404).json({
            ok: false,
            msg: 'getServicio: no existe ningún servicio con el ObjectId(' + params.id + ')'
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error getServicio: fallo al intentar buscar un servicio.',
            error
        })
    }
}

const postServicio = async (req, res) => {
    try {
        console.log('post request: ', req.body);
        const response = await new Servicio(req.body).save()
        console.log('response: ', response);
        return res.status(201).json({
            ok: true,
            msg: 'postServicio: creado un nuevo servicio.',
            response
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error postServicio: fallo al intentar crear un servicio.',
            error
        })
    }
}

const putServicio = async ({ body, params }, res) => {
    try {
        console.log('put request: id ', params.id);
        console.log('body: ', body);

        const { servicio, descripcion } = body;

        const response = await Servicio.findByIdAndUpdate(params.id,
            { servicio, descripcion }, { new: true });
        if (response) {
            console.log('response: ', response)
            return res.status(200).json({
                ok: true,
                msg: 'putServicio: Servicio actualizado con exito.',
                response
            })
        } else return res.status(404).json({
            ok: false,
            msg: 'putServicio: no existe ningún servicio con el ObjectId(' + params.id + ')'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error putServicio: fallo al intentar buscar un servicio.',
            error
        })
    }
}

const deleteServicio = async ({ params }, res) => {
    try {
        console.log('delete request: id ', params.id);
        const response = await Servicio.findByIdAndDelete(params.id);
        if (response) return res.status(200).json({
            ok: true,
            msg: 'deleteServicio: se ha borrado el servicio.',
            response
        })
        else return res.status(404).json({
            ok: false,
            msg: 'deleteServicio: no existe ningún servicio con el ObjectId(' + params.id + ')'
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error deleteServicio: fallo al intentar buscar un servicio.',
            error
        })
    }
}


module.exports = {
    getServicios,
    getServicio,
    postServicio,
    putServicio,
    deleteServicio
}