const Servicio = require("../models/servicioModel");
const Instalacion = require("../models/instalacionModel");
const Producto = require("../models/productoModel");

const rutaBase = process.env.URL_BASE;
// const rutaBase = `http://localhost:${process.env.PORT}/`;
// const rutaBase = 'https://apirest-h60c.onrender.com/';


const getIndex = (req, res) => {

  req.app.locals = '';

  res.render("index", {
    titulo: "INDEX",
    tituloURL: "Index",
  });

};


const getProductos = async (req, res) => {

  req.app.locals = '';

  try {

    const piscinas = await Producto.find({ "tipo": "piscinas" });

    const barbacoas = await Producto.find({ "tipo": "barbacoas" });

    const mobiliario = await Producto.find({ "tipo": "mobiliario" });

    res.render("productos", {
      titulo: "PRODUCTOS",
      tituloURL: "Productos",
      productos: [
        { producto: piscinas, tituloTabla: 'PISCINAS', tituloFooter: 'piscinas' },
        { producto: barbacoas, tituloTabla: 'BARBACOAS', tituloFooter: 'barbacoas' },
        { producto: mobiliario, tituloTabla: 'MOBILIARIO', tituloFooter: 'mobiliario' }
      ]
    });

  } catch (error) {

    res.render("productos", {
      titulo: 'error: ' + error,
      ok: false,
      msg: "Error al traer los datos.",
    });

  };
};


const getInstalacion = async (req, res) => {

  req.app.locals = '';

  try {

    const instalaciones = await Instalacion.find();

    res.render("instalacion", {
      titulo: "INSTALACIÓN",
      tituloURL: "Instalación",
      instalaciones,
    });

  } catch (error) {

    res.render("servicios", {
      ok: false,
      msg: "Error al traer los datos.",
    });

  };
};


const getServicios = async (req, res) => {

  req.app.locals = '';

  try {

    const servicios = await Servicio.find();

    res.render("servicios", {
      titulo: "SERVICIOS",
      tituloURL: "Servicios",
      servicios,
    });

  } catch (error) {

    res.render("servicios", {
      ok: false,
      msg: "Error al traer los datos.",
    });

  };
};


const getQuienesSomos = (req, res) => {

  req.app.locals = '';

  res.render("quienessomos", {
    titulo: "QUIENES SOMOS",
    tituloURL: "Quienes Somos",
  });

};


const getContacto = (req, res) => {

  req.app.locals = '';

  res.render("contacto", {
    titulo: "CONTACTO",
    tituloURL: "Contacto",
  });

};


const getAdmin = (req, res) => {

  res.render("admin/admin", {
    ok: false,
    tituloURL: 'Administrador',
    rutaBase
  });

};


module.exports = {
  getIndex,
  getProductos,
  getServicios,
  getInstalacion,
  getQuienesSomos,
  getContacto,
  getAdmin
};
