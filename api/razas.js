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



// --- Multer ---
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, Math.random().toString().substring(2) + '.' + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});
// -------------------------------------------------------

router.put('/actualizar', upload.single('imagen'), (req, res) => {
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    let categoria = req.body.categoria;

    let toUpdate = {
        nombre,
        descripcion,
        categoria
    };
    if (req.file !== undefined) {
        toUpdate.imagen = req.file.filename;
    }
   

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Raza.findOneAndUpdate(
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