var mongoose = require('mongoose');

var vacunaSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String, require: true, unique:true
    }, 
    descripcion: {
        type: String
    },
    imagen: {
        type: String
    },
    categoria: {
        type: String
    }

    
});



module.exports = mongoose.model('Vacuna', vacunaSchema, 'Vacunas');

