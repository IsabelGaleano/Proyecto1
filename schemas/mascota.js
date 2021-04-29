var mongoose = require('mongoose');

var mascotaSchema= mongoose.Schema({
    duenno: {
        type: String, require: true
    }, 
    nombre: {
        type: String, require: true
    },
    tipo: {
        type: String
    },
    raza: {
        type: String
    },
    padecimientos: {
        type: Array
    },
    vacunas: {
        type: Array
    },
    foto_mascota: {
        type: String
    }, 
    caracteristicas: {
        type: Array
    },
    vacunaDia: {
        type: String
    }

    
});





module.exports = mongoose.model('Mascota', mascotaSchema, 'Mascotas');

