const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Raza = require('../schemas/raza');

router.get('/', (req, res) => {
    Raza.find().exec()
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
    var razaNueva = new Raza({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        categoria: req.body.categoria,

    });

    razaNueva.save()
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
    Raza.find({ nombre: req.body.nombre }).exec()
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
    Raza.findOneAndDelete({ nombre: req.body.nombre }).exec()
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
   

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Raza.findOneAndUpdate(
        {nombre: nombre}, {$set:{
            descripcion:descripcion,
            imagen:imagen,
            categoria:categoria
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