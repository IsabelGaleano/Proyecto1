var mongoose = require('mongoose');

var categoriaMascotaSchema= mongoose.Schema({
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



module.exports = mongoose.model('Categoria_Mascota', categoriaMascotaSchema, 'Categorias_Mascotas');

