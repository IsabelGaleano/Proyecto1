const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Vacuna = require('../schemas/vacuna');

router.get('/', (req, res) => {
    Vacuna.find().exec()
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
    var vacunaNueva = new Vacuna({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        categoria: req.body.categoria,

    });

    vacunaNueva.save()
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
    Vacuna.find({ nombre: req.body.nombre }).exec()
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
    Vacuna.findOneAndDelete({ nombre: req.body.nombre }).exec()
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
    Vacuna.findOneAndUpdate(
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