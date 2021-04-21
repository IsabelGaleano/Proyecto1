var mongoose = require('mongoose');

var categoriaServicioSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String, require: true, unique:true
    }, 
    descripcion: {
        type: String
    },
    imagen: {
        type: String
    }

    
});



module.exports = mongoose.model('Categoria_Servicio', categoriaServicioSchema, 'Categorias_Servicios');

