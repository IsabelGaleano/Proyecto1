const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Categoria_Servicio = require('../schemas/categoria_servicio');

router.get('/', (req, res) => {
    Categoria_Servicio.find().exec()
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
    var categoriaServiciosNueva = new Categoria_Servicio({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen

    });

     categoriaServiciosNueva.save()
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
    Categoria_Servicio.find({ nombre: req.body.nombre }).exec()
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
    Categoria_Servicio.findOneAndDelete({ nombre: req.body.nombre }).exec()
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
   
   

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Categoria_Servicio.findOneAndUpdate(
        {nombre: nombre}, {$set:{
            descripcion:descripcion,
            imagen:imagen
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