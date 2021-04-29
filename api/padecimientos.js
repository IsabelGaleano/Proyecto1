const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Padecimiento = require('../schemas/padecimiento');

router.get('/', (req, res) => {
    Padecimiento.find().exec()
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
    var padecimientoNuevo = new Padecimiento({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        categoria: req.body.categoria,

    });

    padecimientoNuevo.save()
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
    Padecimiento.find({ nombre: req.body.nombre }).exec()
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
    Padecimiento.findOneAndDelete({ nombre: req.body.nombre }).exec()
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
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let imagen = req.body.imagen;
    let categoria = req.body.categoria;

    let toUpdate = {
      nombre,
      descripcion,
      imagen,
      categoria
    };
    
    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Padecimiento.findOneAndUpdate(
        {nombre: nombre}, {$set:toUpdate
    }, 
        {useFindAndModify: false, new: true},  (err, doc) =>{
      res.json(doc);
    })
    .catch(err => {
        res.json({ message: err })
    });
    
  });


module.exports = router;