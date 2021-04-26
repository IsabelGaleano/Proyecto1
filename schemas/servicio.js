const mongoose = require('mongoose');

const servicioSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    proveedor: { type: String, require: true, unique: true }, 
    nombre_servicio: { type: String, require: true },
    latitud_servicio: { type: String },
    longitud_servicio: { type: String },
    nivel_servicio: { type: String },
    descripcion: { type: String},
    costo: { type: Number }, 
    dias_servicio: { type: Array },
    horario_servicio: { type: Array },
    imagenes_servicio: { type: Array },
    whatsapp: { type: Number },
    facebook: { type: String },
    instagram: { type: String },
    estado: { type: String, default: 'pendiente' }, 
    categoria_servicio: { type: String},
    direccion: { type: String}
});

module.exports = mongoose.model('Servicio', servicioSchema, 'Servicios');
