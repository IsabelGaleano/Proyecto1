const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Servicio = require('../schemas/servicio');

router.get('/', (req, res) => {
    Servicio.find().exec()
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
    var servicioNuevo = new Servicio({
        _id: new mongoose.Types.ObjectId(),
        proveedor: req.body.proveedor,
        nombre_servicio: req.body.nombre_servicio,
        latitud_servicio: req.body.latitud_servicio,
        longitud_servicio: req.body.longitud_servicio,
        nivel_servicio: req.body.nivel_servicio,
        descripcion: req.body.descripcion,
        costo: req.body.costo,
        dias_servicio: req.body.dias_servicio,
        horario_servicio: req.body.horario_servicio,
        imagenes_servicio: req.body.imagenes_servicio,
        whatsapp: req.body.whatsapp,
        instagram: req.body.instagram,
        facebook: req.body.facebook,
        estado: req.body.estado,
        categoria_servicio: req.body.categoria_servicio

    });

    servicioNuevo.save()
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
    Servicio.find({ proveedor: req.body.proveedor }).exec()
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
    Servicio.findOneAndDelete({ proveedor: req.body.proveedor }).exec()
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
    let proveedor = req.body.proveedor;
    let nombre_servicio = req.body.nombre_servicio;
    let latitud_servicio = req.body.latitud_servicio;
    let longitud_servicio = req.body.longitud_servicio;
    let nivel_servicio = req.body.nivel_servicio;
    let descripcion =  req.body.descripcion;
    let costo = req.body.costo;
    let dias_servicio = req.body.dias_servicio;
    let horario_servicio = req.body.horario_servicio;
    let imagenes_servicio = req.body.imagenes_servicio;
    let whatsapp = req.body.whatsapp;
    let instagram = req.body.instagram;
    let facebook = req.body.facebook;
    let estado = req.body.estado;
    let categoria_servicio = req.body.categoria_servicio;

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Servicio.findOneAndUpdate(
        {proveedor: proveedor}, {$set:{
            nombre_servicio:nombre_servicio, 
            latitud_servicio:latitud_servicio, 
            longitud_servicio:longitud_servicio, 
            nivel_servicio:nivel_servicio, 
            descripcion:descripcion,
            costo:costo,
            dias_servicio:dias_servicio,
            horario_servicio:horario_servicio,
            imagenes_servicio: imagenes_servicio,
            whatsapp:whatsapp,
            instagram:instagram,
            facebook:facebook,
            estado:estado,
            categoria_servicio:categoria_servicio
        }
    }, 
        {useFindAndModify: false, new: true},  (err, doc) =>{
      res.json(doc);
    })
    .catch(err => {
        res.json({ message: err })
    });
    
  });


module.exports = router;