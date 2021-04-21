const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Accion = require('../schemas/accion');

router.get('/', (req, res) => {
    Accion.find().exec()
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
    var accionNueva = new Accion({
        _id: new mongoose.Types.ObjectId(),
        usuario: req.body.usuario,
        accion: req.body.accion,
        fecha: req.body.fecha

    });

    accionNueva.save()
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
    Accion.find({ usuario: req.body.usuario }).exec()
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
    Accion.findOneAndDelete({ usuario: req.body.usuario }).exec()
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
    let usuario = req.body.usuario;
    let accion = req.body.accion;
    let fecha = req.body.fecha;
   
   

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Accion.findOneAndUpdate(
        {usuario: usuario}, {$set:{
            accion:accion,
            fecha:fecha
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