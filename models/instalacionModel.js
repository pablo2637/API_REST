const { Schema, model } = require("mongoose");

const InstalacionSchema = new Schema({
  tipo: String,
  descripcion: {
    type: String,
    required: true,
    trim: true,
  },
  precio: Number,
  dias: Number,
});

module.exports = model("Instalacion", InstalacionSchema);
