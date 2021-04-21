const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Solicitud_Registro = require('../schemas/solicitud_registro');

router.get('/', (req, res) => {
    Solicitud_Registro.find().exec()
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
    var solicitudRegistroNueva = new Solicitud_Registro({
        _id: new mongoose.Types.ObjectId(),
        proveedor: req.body.proveedor,
        fecha: req.body.fecha

    });

    solicitudRegistroNueva.save()
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
    Solicitud_Registro.find({ proveedor: req.body.proveedor }).exec()
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
    Solicitud_Registro.findOneAndDelete({ proveedor: req.body.proveedor }).exec()
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
    let fecha = req.body.fecha;
   

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Solicitud_Registro.findOneAndUpdate(
        {proveedor: proveedor}, {$set:{
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