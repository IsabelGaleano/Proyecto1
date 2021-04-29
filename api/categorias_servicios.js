const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Categoria_Servicio = require('../schemas/categoria_servicio');

router.get('/', (req, res) => {
  Categoria_Servicio.find()
    .exec()
    .then(function (result) {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.post('/insertar', (req, res) => {
  var categoriaServiciosNueva = new Categoria_Servicio({
    _id: new mongoose.Types.ObjectId(),
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
  });

  categoriaServiciosNueva
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.post('/buscar', (req, res) => {
  Categoria_Servicio.find({ nombre: req.body.nombre })
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.delete('/eliminar', (req, res) => {
  Categoria_Servicio.findOneAndDelete({ nombre: req.body.nombre })
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
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

  let toUpdate = {
    nombre,
    descripcion,
  };
  if (req.file !== undefined) {
    toUpdate.imagen = req.file.filename;
  }

  // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
  Categoria_Servicio.findOneAndUpdate(
    { nombre: nombre },
    {
      $set: toUpdate,
    },
    { useFindAndModify: false, new: true },
    (err, doc) => {
      res.json(doc);
    }
  ).catch(err => {
    res.json({ message: err });
  });
});

module.exports = router;
