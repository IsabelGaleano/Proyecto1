const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let Usuario = require('../schemas/usuario');
const TOKEN_SECRET = 'w@veRabbit88316452!';

router.get('/', (req, res) => {
    Usuario.find().exec()
        .then(
            function (result) {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
        
});


router.get('/actual', (req, res) => {
    Usuario.findById(req.userId).exec()
        .then(
            function (result) {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
        
});

router.post('/insertar', (req, res) => {
    let usuarioNuevo = new Usuario({
        _id: new mongoose.Types.ObjectId(),
        correo: req.body.correo,
        tipo_usuario: req.body.tipo_usuario,
        nombre: req.body.nombre,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        tipo_identificacion: req.body.tipo_identificacion,
        identificacion: req.body.identificacion,
        fecha_nacimiento: req.body.fecha_nacimiento,
        genero: req.body.genero,
        telefono: req.body.telefono,
        imagen_usuario: req.body.imagen_usuario,
        cantidad_mascotas: req.body.cantidad_mascotas,
        contrasenna: req.body.contrasenna,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        direccion: req.body.direccion,
        promedio_calificacion: req.body.promedio_calificacion,
        estado: req.body.estado

    });

    usuarioNuevo.save()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });

});

router.post('/buscar', (req, res) => {
    Usuario.find({ correo: req.body.correo }).exec()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
});

router.post('/buscar/:campo', async (req, res) => {
    try {
        if (!['proveedor', 'administrador'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }
        const { tipo, estado, cliente } = req.body;
        const usuarios = await Usuario.find({ tipo_usuario: tipo, estado, cliente: {'$regex': cliente, '$options': 'i'} });
        
        res.json(usuarios);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.post('/buscar_usuarios_solicitudes', (req, res) => {
    Usuario.find({correo:  { $in: req.body.correo}}).exec()
        .then(
            result => {
                
                res.json(result);
              
               
            }

        )
        .catch(err => {
            res.json({ message: err })
        });
        

});



router.post('/buscar_tipo_usuario_registro', (req, res) => {
    Usuario.find({ tipo_usuario: req.body.tipo_usuario, estado: req.body.estado }).exec()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
        

});
  


router.post('/buscar_tipo_usuario', (req, res) => {
    Usuario.find({ tipo_usuario: req.body.tipo_usuario }).exec()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
        

});
  


router.delete('/eliminar', (req, res) => {
    Usuario.findOneAndDelete({ correo: req.body.correo }).exec()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
        

});



router.put('/actualizar', (req, res) => {
    let correo = req.body.correo;
    let tipo_usuario = req.body.tipo_usuario;
    let nombre = req.body.nombre;
    let apellido1 = req.body.apellido1;
    let apellido2 = req.body.apellido2;
    let provincia = req.body.provincia;
    let canton = req.body.canton;
    let distrito = req.body.distrito;
    let genero = req.body.genero;
    let telefono = req.body.telefono;
    let imagen_usuario = req.body.imagen_usuario;
    let cantidad_mascotas = req.body.cantidad_mascotas;
    let contrasenna = req.body.contrasenna;
    let latitud = req.body.latitud;
    let longitud = req.body.longitud;
    let direccion = req.body.direccion;
    let promedio_calificacion = req.body.promedio_calificacion;
    let fecha_nacimiento = req.body.fecha_nacimiento;
    let estado = req.body.estado;
    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Usuario.findOneAndUpdate(
        {correo: correo}, {$set:{
            tipo_usuario:tipo_usuario, 
            nombre:nombre, 
            apellido1:apellido1, 
            apellido2:apellido2, 
            provincia:provincia,
            canton:canton,
            distrito:distrito,
            genero:genero,
            telefono: telefono,
            imagen_usuario:imagen_usuario,
            cantidad_mascotas:cantidad_mascotas,
            latitud:latitud,
            longitud:longitud,
            direccion:direccion,
            promedio_calificacion:promedio_calificacion,
            fecha_nacimiento:fecha_nacimiento,
            estado:estado
        }
    }, 
        {useFindAndModify: false, new: true},  (err, doc) =>{
      res.json(doc);
    })
    .catch(err => {
        res.json({ message: err })
    });
    
  });

  
  router.put('/actualizar_estado', (req, res) => {
    
    let correo = req.body.correo;
    let estado = req.body.estado;
    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Usuario.findOneAndUpdate(
        {correo: correo}, {$set:{
            estado:estado
        }
    }, 
        {useFindAndModify: false, new: true},  (err, doc) =>{
      res.json(doc);
    })
    .catch(err => {
        res.json({ message: err })
    });
    
  });



  
router.post('/buscar_usuario', function(req, res) {

    Usuario.findOne({ correo: req.body.correo }, (err, personaDB) => {
        if (err) {
            return res.json({
                success: false,
                msj: 'No se encontró ninguna persona con esa identificación',
                err
            });
        } else {
            return res.json({
                success: personaDB !== null,
                persona: personaDB
            });
        }
    })

});

const compararContrasenna = (contrasenna, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(contrasenna, hash, (err, res) => {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
}



router.post('/login', async (req, res) => {
    try {
        const { correo, contrasenna } = req.body;
        const usuario = await Usuario.findOne({ correo }).exec();

        if (usuario) {
            const contrasennaValida = await compararContrasenna(contrasenna, usuario.contrasenna);

            if (contrasennaValida) {
                const token = jwt.sign({ 
                    role: usuario.tipo_usuario,  
                    userId: usuario._id,
                    correo: usuario.correo
                }, TOKEN_SECRET);

                res.json({
                    token,
                    role: usuario.tipo_usuario,
                    correo: usuario.correo,
                    message: "usuario logeado correctamente" 
                });
            } else {
                res.status(401).json({
                    message: "email o contraseña invalida" 
                })
            }
        } else {
            res.status(401).json({
                message: "email o contraseña invalida" 
            })
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    } 
});

router.post('/buscar_tipo', (req, res) => {
  Usuario.find()
    .exec()
    .then(function (result) {
      const year = req.body.year;

      let finalRes = [
        {
          tipo: 'cliente',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          tipo: 'proveedor',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ];

      result.forEach(user => {
        let userDate = new Date(user.fecha_registro);
        let currentMonth = userDate.getUTCMonth();
        let currentYear = userDate.getUTCFullYear();
        if (year === currentYear) {
          if (user.tipo_usuario === 'cliente') {
            finalRes[0].data[currentMonth] += 1;
          } else if (user.tipo_usuario === 'proveedor') {
            finalRes[1].data[currentMonth] += 1;
          }
        }
      });

      res.json(finalRes);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.get('/buscar_tipo_min_year', (req, res) => {
  Usuario.find()
    .exec()
    .then(function (result) {
      let finalRes = { minYear: new Date().getUTCFullYear() };

      result.forEach(user => {
        let userDate = new Date(user.fecha_registro);
        let currentYear = userDate.getUTCFullYear();
        finalRes.minYear =
          currentYear < finalRes.minYear ? currentYear : finalRes.minYear;
      });

      res.json(finalRes);
    })
    .catch(err => {
      res.json({ message: err });
    });
});


router.post('/cambiar_contrasenna', async (req, res) => {
    try {
        const { contrasenna, token } = req.body;
        const decoded = jwt.verify(token, TOKEN_SECRET);
        console.log(decoded)
        const doc = await Usuario.findOneAndUpdate({ correo: decoded.email || decoded.correo }, { contrasenna }, { new: true});

        if (!doc) {
            res.status(401).json({ message: "usuario invalido", success: false });
            return;
        }

        res.json({ message: "contraseña actualizad con exito", success: true });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.get('/reporte_administrador', (req, res) => {
    Usuario.find().exec()
        .then(
            function (result) {
                

                let finalRes = {
                    usuarios: 0,
                    proveedores: 0,
                    clientes: 0
                }

                finalRes.usuarios = result.length;
                result.forEach(v => {
                    if (v.tipo_usuario === 'cliente') {
                        finalRes.clientes++;
                    }
                    if (v.tipo_usuario === 'proveedor') {
                        finalRes.proveedores++;
                    }
                });

                res.json(finalRes);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
        
});


router.put('/actualizar_proveedor', (req, res) => {
    let correo = req.body.correo;
    let nombre = req.body.nombre;
    let apellido1 = req.body.apellido1;
    let apellido2 = req.body.apellido2;
    let provincia = req.body.provincia;
    let canton = req.body.canton;
    let distrito = req.body.distrito;
    let imagen_usuario = req.body.imagen_usuario;   
    let tipo_identificacion = req.body.tipo_identificacion;
    let identificacion = req.body.identificacion;
    let fecha_nacimiento = req.body.fecha_nacimiento;
    let telefono = req.body.telefono;
    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Usuario.findOneAndUpdate(
        {correo: correo}, {$set:{
            nombre:nombre, 
            apellido1:apellido1, 
            apellido2:apellido2, 
            provincia:provincia,
            canton:canton,
            distrito:distrito,
            imagen_usuario:imagen_usuario,
            tipo_identificacion:tipo_identificacion,
            identificacion:identificacion,
            fecha_nacimiento:fecha_nacimiento,
            telefono:telefono
        }
    }, 
        {useFindAndModify: false, new: true},  (err, doc) =>{
      res.json(doc);
    })
    .catch(err => {
        res.json({ message: err })
    });
    
  });

  router.get('/servicios_posiciones', (req, res) => {
    Usuario.find().exec()
    .then(
        function (result) {
            let posiciones = [];

                result.forEach(usuario => {
                    if (!(usuario.latitud && usuario.longitud && usuario.tipo_usuario === 'proveedor')) return;
                     posiciones.push({
                        correo: usuario.correo,
                        latitud: usuario.latitud,
                        longitud: usuario.longitud
                    });
                });

                res.json(posiciones);
        }
    )
    .catch(err => {
        res.json({ message: err })
    });
});

module.exports = router;