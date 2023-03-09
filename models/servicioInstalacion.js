const { Schema, model } = require("mongoose");

const InstalacionSchema = new Schema({
  tipo: String,
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  costo: Number,
  dias: Number,
  demanda: Boolean,
  img: String,
});

module.exports = model("Instalacion", InstalacionSchema);
