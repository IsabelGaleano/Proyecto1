const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Denuncia = require('../schemas/denuncia');

router.get('/', (req, res) => {
    Denuncia.find().exec()
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
    var denunciaNueva = new Denuncia({
        _id: new mongoose.Types.ObjectId(),
        denunciante: req.body.denunciante,
        fecha: req.body.fecha,
        denunciado: req.body.denunciado,
        motivo: req.body.motivo,
        categoria: req.body.categoria,

    });

    denunciaNueva.save()
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
    Denuncia.find({ denunciante: req.body.denunciante }).exec()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
        

});


router.post('/buscar_denuncias', (req, res) => {
    Denuncia.find({ $and: 
        [
            {denunciado: req.body.denunciado},
            {motivo: req.body.motivo}
        ]
    }).exec()
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
    Denuncia.findOneAndDelete({ denunciante: req.body.denunciante }).exec()
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
    let denunciante = req.body.denunciante;
    let fecha = req.body.fecha;
    let denunciado = req.body.denunciado;
    let motivo = req.body.motivo;
    let fecha_contrato = req.body.fecha_contrato;
    let categoria = req.body.categoria;

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Denuncia.findOneAndUpdate(
        {denunciante: denunciante}, {$set:{
            fecha:fecha,
            denunciado:denunciado,
            motivo:motivo,
            fecha_contrato:fecha_contrato,
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