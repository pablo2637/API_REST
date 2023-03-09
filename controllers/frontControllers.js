// const { response } = require('express');
const Servicio = require("../models/servicioModel");
const Instalacion = require("../models/servicioInstalacion");

const getIndex = (req, res) => {
  res.render("index", {
    titulo: "Estas en el INDEX.",
    tituloURL: "Index",
  });
};

const getProductos = (req, res) => {
  res.render("productos", {
    titulo: "Estas en PRODUCTOS.",
    tituloURL: "Productos",
  });
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
      titulo: "Estas en SERVICIOS.",
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

module.exports = {
  getIndex,
  getProductos,
  getServicios,
  getInstalacion,
  getQuienesSomos,
  getContacto,
};
