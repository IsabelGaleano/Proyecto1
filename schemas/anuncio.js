var mongoose = require('mongoose');

var anuncioSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imagen: {
        type: String
    }

    
});



module.exports = mongoose.model('Anuncio', anuncioSchema, 'Anuncios');

