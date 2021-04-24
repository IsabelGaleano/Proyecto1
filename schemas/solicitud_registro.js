var mongoose = require('mongoose');

var solicitudRegistroSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    proveedor: {
        type: String, require: true, unique:true
    }, 
    fecha: {
        type: Date
    },
});



module.exports = mongoose.model('Solicitud_Registro', solicitudRegistroSchema, 'Solicitudes_Registros');

