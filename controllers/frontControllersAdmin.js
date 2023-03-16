const rutaBase = 'http://localhost:3000/'

const { fetchData } = require('../helpers/fetchData')
const { generateJwt } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');

const showDashboard = async (req, res) => {
    try {
        // const token = localStorage.getItem('x-token') || '';
        // const resp = jwt.verify(token, process.env.URI_SECRET_KEY)
        // console.log(resp);

        let productos;
        const { url: urlP, options: optionsP } = fetchData('getProdAll', req);
        const peticionP = await fetch(urlP, optionsP);

        if (peticionP.ok) {
            const responseP = await peticionP.json();
            productos = responseP.productos;
            productos.forEach(prod => prod.fecha = new Date(prod.fecha).toLocaleDateString())

        } else res.render("error", {
            ok: false,
            msg: "Error showDashboard",
            peticionP
        });

        let servicios;
        const { url: urlS, options: optionsS } = fetchData('getServAll', req);
        const peticionS = await fetch(urlS, optionsS);

        if (peticionS.ok) {
            const responseS = await peticionS.json();
            servicios = responseS.data;
            servicios.forEach(serv => serv.fecha = new Date(serv.fecha).toLocaleDateString());

        } else res.render("error", {
            ok: false,
            msg: "Error showDashboard",
            peticionS
        });

        if (productos && servicios) {
            res.render("admin/dashboard", {
                titulo: "Menú de Administrador",
                tituloURL: "dashboard",
                rutaBase,
                productos,
                servicios
            });
        }

    } catch (error) {
        res.render("error", {
            ok: false,
            msg: "Error showDashboard",
            error
        });
    }

};

const getServicio = async (req, res) => {
    try {
        const { url, options } = fetchData('getServ', req);
        const peticion = await fetch(url, options);

        if (peticion.ok) {
            const response = await peticion.json();
            let data = response.data;
            data.fecha = new Date(data.fecha).toLocaleDateString();

            res.status(200).render('admin/formServicio', {
                ok: true,
                tituloURL: 'Modificar Servicio',
                rutaBase,
                servicio: data
            })
        } else return {
            ok: false,
            resp: peticion
        }
    } catch (error) {
        res.render("error", {
            ok: false,
            msg: "getServicio: Error.",
            error
        });
    }
}

const newServicio = async (req, res) => {
    res.status(200).render('admin/formServicio', {
        ok: true,
        tituloURL: 'Nuevo Servicio',
        rutaBase,
        msg: ''
    })
}

const postServicio = async (req, res) => {
    try {
        const { url, options } = fetchData('postServ', req);
        const peticion = await fetch(url, options);
        const response = await peticion.json();

        if (peticion.ok) {

            res.redirect('/dashboard');
        } else {
            let error;
            const servicio = {
                descripcion: req.body.descripcion,
                servicio: req.body.servicio
            }
            if (servicio.servicio == '') error = response.errors.servicio.msg
            else if (servicio.descripcion == '') error = response.errors.descripcion.msg

            res.render('admin/formServicio', {
                ok: false,
                tituloURL: 'Error: Nuevo Servicio',
                rutaBase,
                servicio,
                error
            })
        }
    } catch (error) {
        res.render("error", {
            ok: false,
            msg: "Error postServicio.",
            error
        });
    }
}

const putServicio = async (req, res) => {
    try {
        const { url, options } = fetchData('putServ', req);
        const peticion = await fetch(url, options);
        const response = await peticion.json();

        if (peticion.ok) {

            res.redirect('/dashboard');
        } else {
            let error;
            const servicio = {
                _id: req.params.id,
                descripcion: req.body.descripcion,
                servicio: req.body.servicio
            }
            if (servicio.servicio == '') error = response.errors.servicio.msg
            else if (servicio.descripcion == '') error = response.errors.descripcion.msg

            res.render('admin/formServicio', {
                ok: false,
                tituloURL: 'Error: Modificar Servicio',
                rutaBase,
                servicio,
                error
            })
        }
    } catch (error) {
        res.render("error", {
            ok: false,
            msg: "Error putServicio.",
            error
        });
    }
}

const deleteServicio = async (req, res) => {
    try {
        const { url, options } = fetchData('dltServ', req);
        const peticion = await fetch(url, options);
        const response = await peticion.json();

        if (peticion.ok) {

            res.redirect('/dashboard');
        } else res.render("error", {
            ok: false,
            msg: "Error deleteServicio.",
            peticion
        });
    } catch (error) {
        res.render("error", {
            ok: false,
            msg: "Error deleteServicio.",
            error
        });
    }
}

const checkUser = async (req, res) => {
    try {
        const { url, options } = fetchData('chkUser', req);
        const peticion = await fetch(url, options);
        const response = await peticion.json();

        if (peticion.ok) {

            const token = await generateJwt(response.data._id, response.data.nombre)
            // res.send({ 'x-token': token });

            res.redirect('/dashboard')
        } else {
            res.render('admin/admin', {
                ok: false,
                tituloURL: 'Error: Administrador',
                rutaBase,
                email: req.body.email,
                error: 'Error al validar usuario/contraseña!'
            })
        }
    } catch (error) {
        res.render("error", {
            ok: false,
            msg: "Error checkUser.",
            error
        });
    }
}

module.exports = {
    showDashboard,
    getServicio,
    putServicio,
    deleteServicio,
    postServicio,
    newServicio,
    checkUser
}