var mongoose = require('mongoose');

var notificacionSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    receptor: {
        type: String
    }, 
    descripcion: {
        type: String
    },
    fecha: {
        type: Date
    },
    emisor: {
        type: String
    }

    
});



module.exports = mongoose.model('Notificacion', notificacionSchema, 'Notificaciones');

