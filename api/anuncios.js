const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Anuncio = require('../schemas/anuncio');

router.get('/', (req, res) => {
    Anuncio.find().exec()
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
    var anuncioNuevo = new Anuncio({
        _id: new mongoose.Types.ObjectId(),
        imagen: req.body.imagen

    });

    anuncioNuevo.save()
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
    Anuncio.find({ imagen: req.body.imagen }).exec()
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
    Anuncio.findOneAndDelete({ imagen: req.body.imagen }).exec()
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
    let imagen = req.body.imagen;
  
    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Anuncio.findOneAndUpdate(
        {imagen: imagen}, {$set:{
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