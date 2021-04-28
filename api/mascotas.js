const express = require('express');
const mongoose = require('mongoose');
const mascota = require('../schemas/mascota');
let router = express.Router();

let Mascota = require('../schemas/mascota');

router.get('/', (req, res) => {
  Mascota.find()
    .exec()
    .then(function (result) {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.post('/insertar', (req, res) => {
  var mascotaNueva = new Mascota({
    _id: new mongoose.Types.ObjectId(),
    duenno: req.body.duenno,
    nombre: req.body.nombre,
    tipo: req.body.tipo,
    raza: req.body.raza,
    padecimientos: req.body.padecimientos,
    vacunas: req.body.vacunas,
    vacunas_dia: req.body.vacunas_dia,
    foto_mascota: req.body.foto_mascota,
    caracteristicas: req.body.caracteristicas,
  });

  mascotaNueva
    .save()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.post('/buscar', (req, res) => {
  Mascota.find({ duenno: req.body.duenno })
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.get('/buscar_tipo', (req, res) => {
  Mascota.find()
    .exec()
    .then(function (result) {
      let filteredPetsByType = [];

      result.forEach(resPet => {
        if (
          filteredPetsByType.some(
            pet => pet.tipo === resPet.tipo && pet.cantidad++
          )
        )
          return;
        filteredPetsByType.push({ tipo: resPet.tipo, cantidad: 1 });
      });

      res.json(filteredPetsByType);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.get('/buscar_raza', (req, res) => {
  Mascota.find()
    .exec()
    .then(function (result) {
      let filteredPetsByRace = [];

      result.forEach(resPet => {
        if (
          filteredPetsByRace.some(
            pet => pet.raza === resPet.raza && pet.cantidad++
          )
        )
          return;
        filteredPetsByRace.push({ raza: resPet.raza, cantidad: 1 });
      });

      res.json(filteredPetsByRace);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.delete('/eliminar', (req, res) => {
  Mascota.findOneAndDelete({ duenno: req.body.duenno })
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

router.put('/actualizar', (req, res) => {
  let duenno = req.body.duenno;
  let nombre = req.body.nombre;
  let tipo = req.body.tipo;
  let raza = req.body.raza;
  let padecimientos = req.body.padecimientos;
  let vacunas = req.body.vacunas;
  let vacunaDia = req.body.vacunaDia;
  let foto_mascota = req.body.foto_mascota;
  let caracteristicas = req.body.caracteristicas;

  // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
  Mascota.findOneAndUpdate(
    { duenno: duenno },
    {
      $set: {
        nombre: nombre,
        tipo: tipo,
        raza: raza,
        padecimientos: padecimientos,
        vacunas: vacunas,
        vacunaDia: vacunaDia,
        foto_mascota: foto_mascota,
        caracteristicas: caracteristicas,
      },
    },
    { useFindAndModify: false, new: true },
    (err, doc) => {
      res.json(doc);
    }
  ).catch(err => {
    res.json({ message: err });
  });
});

router.get('/cantidad_total', (req, res) => {
  Mascota.find()
    .exec()
    .then(function (result) {
      let finalRes = { cantidad: result.length };
      res.json(finalRes);
    })
    .catch(err => {
      res.json({ message: err });
    });
});


router.post('/buscar_mascotas_duenno', (req, res) => {
  Mascota.find({
    $and:
      [
        { duenno: req.body.duenno },
        { nombre: req.body.nombre }
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



router.delete('/eliminar_mascota', (req, res) => {
  Mascota.findOneAndDelete({
    $and: [
      { duenno: req.body.duenno },
      { nombre: req.body.nombre }
    ]
  })
    .exec()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json({ message: err });
    });
});


router.put('/actualizar_mascotas', (req, res) => {
  let duenno = req.body.duenno;
  let nombre = req.body.nombre;
  let tipo = req.body.tipo;
  let raza = req.body.raza;
  let padecimientos = req.body.padecimientos;
  let vacunas = req.body.vacunas;
  let vacunaDia = req.body.vacunaDia;
  let foto_mascota = req.body.foto_mascota;
  let caracteristicas = req.body.caracteristicas;

  // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
  Mascota.findOneAndUpdate(
    {
      $and: [
        { duenno: req.body.duenno },
        { nombre: req.body.nombre }

      ]
    },
    {
      $set: {
        nombre: nombre,
        tipo: tipo,
        raza: raza,
        padecimientos: padecimientos,
        vacunas: vacunas,
        vacunaDia: vacunaDia,
        foto_mascota: foto_mascota,
        caracteristicas: caracteristicas,
      },
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
