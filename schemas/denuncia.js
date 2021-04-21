var mongoose = require('mongoose');

var denunciaSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    denunciante: {
        type: String
    }, 
    fecha: {
        type: Date
    },
    denunciado: {
        type: String
    },
    motivo: {
        type: String
    },
    fecha_contrato: {
        type: Date
    },
    categoria: {
        type: String
    }


    
});



module.exports = mongoose.model('Denuncia', denunciaSchema, 'Denuncias');

