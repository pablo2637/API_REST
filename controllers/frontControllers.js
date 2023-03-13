const Servicio = require("../models/servicioModel");
const Instalacion = require("../models/instalacionModel");
const Producto = require("../models/productoModel");

const getIndex = (req, res) => {
  res.render("index", {
    titulo: "Estas en el INDEX.",
    tituloURL: "Index",
  });
};

const getProductos = async (req, res) => {
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
  }
};

const getInstalacion = async (req, res) => {
  try {
    const instalaciones = await Instalacion.find();
    res.render("instalacion", {
      titulo: "Estas en INSTALACION.",
      tituloURL: "Instalación",
      instalaciones,
    });
  } catch (error) {
    res.render("servicios", {
      ok: false,
      msg: "Error al traer los datos.",
    });
  }
};

const getServicios = async (req, res) => {
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
  }
};

const getQuienesSomos = (req, res) => {
  res.render("quienessomos", {
    titulo: "Estas en QUIENES SOMOS.",
    tituloURL: "Quienes Somos",
  });
};

const getContacto = (req, res) => {
  res.render("contacto", {
    titulo: "Estas en CONTACTO.",
    tituloURL: "Contacto",
  });
};

const showDashboard = async (req, res) => {
  try {
    const productos = await Producto.find();
    const servicios = await Servicio.find();

    if (productos && servicios) {
      res.render("dashboard", {
        titulo: "Menú de Administrador",
        tituloURL: "dashboard",
        productos, servicios
      });
    }

  } catch (error) {
    res.render("admin", {
      ok: false,
      msg: "Error al traer los datos.",
    });
  }

};

module.exports = {
  getIndex,
  getProductos,
  getServicios,
  getInstalacion,
  getQuienesSomos,
  getContacto,
  showDashboard
};
