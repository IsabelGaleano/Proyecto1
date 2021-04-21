const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Notificacion = require('../schemas/notificacion');

router.get('/', (req, res) => {
    Notificacion.find().exec()
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
    var notificacionNueva = new Notificacion({
        _id: new mongoose.Types.ObjectId(),
        receptor: req.body.receptor,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        emisor: req.body.emisor,

    });

    notificacionNueva.save()
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
    Notificacion.find({ receptor: req.body.receptor }).exec()
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
    Notificacion.findOneAndDelete({ receptor: req.body.receptor }).exec()
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
    let receptor = req.body.receptor;
    let descripcion = req.body.descripcion;
    let fecha = req.body.fecha;
    let emisor = req.body.emisor;
   

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Notificacion.findOneAndUpdate(
        {receptor: receptor}, {$set:{
            descripcion:descripcion,
            fecha:fecha,
            emisor:emisor
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