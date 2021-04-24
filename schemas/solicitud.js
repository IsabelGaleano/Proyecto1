var mongoose = require('mongoose');

var solicitudSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    proveedor: {
        type: String
    }, 
    cliente: {
        type: String
    },
    tipo: {
        type: String
    },
    estado: {
        type: String
    },
    fecha: {
        type: Date
    } 
});

module.exports = mongoose.model('Solicitud', solicitudSchema, 'Solicitudes');
