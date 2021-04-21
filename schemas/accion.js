var mongoose = require('mongoose');

var accionSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    usuario: {
        type: String
    }, 
    accion: {
        type: String
    },
    fecha: {
        type: Date
    },
    
});



module.exports = mongoose.model('Accion', accionSchema, 'Acciones');

