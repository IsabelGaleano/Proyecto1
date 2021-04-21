var mongoose = require('mongoose');
var bcrypt = require('bcrypt')

var usuarioSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    correo: {
        type: String, require: true, unique:true
    },
    tipo_usuario: {
        type: String, require: true
    }, 
    nombre: {
        type: String, require: true
    },
    apellido1: {
        type: String, require: true
    },
    apellido2: {
        type: String, require: true
    },
    provincia: {
        type: String
    },
    canton: {
        type: String
    },
    distrito: {
        type: String
    }, 
    tipo_identificacion: {
        type: String
    },
    identificacion: {
        type: Number
    },
    fecha_nacimiento: {
        type: Date
    },
    genero: {
        type: String
    },
    telefono: {
        type: Number
    },
    imagen_usuario: {
        type: String
    },
    cantidad_mascotas: {
        type: Number
    },
    contrasenna: {
        type: String
    },
    latitud: {
        type: String
    },
    longitud: {
        type: String
    },
    direccion: {
        type: String
    },
    promedio_calificacion: {
        type: Number
    },
    estado: {
        type: String
    }
    
});


usuarioSchema.pre('save', function(next){
    bcrypt.genSalt(10).then(salts =>{
        bcrypt.hash(this.contrasenna,salts).then(hash =>{
            this.contrasenna = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'Usuarios');

