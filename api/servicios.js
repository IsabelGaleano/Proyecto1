const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Servicio = require('../schemas/servicio');
const Usuario  = require('../schemas/usuario');

router.get('/', (req, res) => {
    Servicio.find().exec()
        .then(
            function (result) {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
        
});

router.get('/categoria/:categoria', async (req, res) => {
    try {
        const { categoria } = req.params;
        const servicios = await Servicio.find({ categoria_servicio: categoria });
        res.json(servicios);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post('/buscar', async (req, res) => {
    try {
        if (!['proveedor'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }

        const proveedor = await Servicio.findOne({ proveedor : req.body.proveedor });

        res.json({ proveedor });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post('/insertar', async (req, res) => {
    try {
        if (!['proveedor'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }
      
        const usuario = await Usuario.findById(req.userId);

        if (usuario?.estado === 'aprobado') {
            const servicioNuevo = new Servicio({
                _id: new mongoose.Types.ObjectId(),
                proveedor: req.body.proveedor,
                nombre_servicio: req.body.nombre_servicio,
                latitud_servicio: req.body.latitud_servicio,
                longitud_servicio: req.body.longitud_servicio,
                nivel_servicio: req.body.nivel_servicio,
                descripcion: req.body.descripcion,
                costo: req.body.costo,
                dias_servicio: req.body.dias_servicio,
                horario_servicio: req.body.horario_servicio,
                imagenes_servicio: req.body.imagenes_servicio,
                whatsapp: req.body.whatsapp,
                instagram: req.body.instagram,
                facebook: req.body.facebook,
                categoria_servicio: req.body.categoria_servicio,
            });
          
            const servicio = await servicioNuevo.save();
            res.json({ servicio });
        } else {
            res.status(403).json({ message: 'request no autorizado' });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete('/eliminar', (req, res) => {
    Servicio.findOneAndDelete({ proveedor: req.body.proveedor }).exec()
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
    let nombre_servicio = req.body.nombre_servicio;
    let latitud_servicio = req.body.latitud_servicio;
    let longitud_servicio = req.body.longitud_servicio;
    let nivel_servicio = req.body.nivel_servicio;
    let descripcion =  req.body.descripcion;
    let costo = req.body.costo;
    let dias_servicio = req.body.dias_servicio;
    let horario_servicio = req.body.horario_servicio;
    let imagenes_servicio = req.body.imagenes_servicio;
    let whatsapp = req.body.whatsapp;
    let instagram = req.body.instagram;
    let facebook = req.body.facebook;
    let estado = req.body.estado;
    let categoria_servicio = req.body.categoria_servicio;

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Servicio.findOneAndUpdate(
        {proveedor: proveedor}, {$set:{
            nombre_servicio:nombre_servicio, 
            latitud_servicio:latitud_servicio, 
            longitud_servicio:longitud_servicio, 
            nivel_servicio:nivel_servicio, 
            descripcion:descripcion,
            costo:costo,
            dias_servicio:dias_servicio,
            horario_servicio:horario_servicio,
            imagenes_servicio: imagenes_servicio,
            whatsapp:whatsapp,
            instagram:instagram,
            facebook:facebook,
            estado:estado,
            categoria_servicio:categoria_servicio,
        }
    }, 
        {useFindAndModify: false, new: true},  (err, doc) =>{
      res.json(doc);
    })
    .catch(err => {
        res.json({ message: err })
    });
    
  });

router.post('/buscar_servicio_solicitudes', (req, res) => {
    Servicio.find({proveedor:  { $in: req.body.proveedor}}).exec()
        .then(
            result => {
                
                res.json(result);
              
            }

        )
        .catch(err => {
            res.json({ message: err })
        });
        

});

router.get('/buscar_categoria', (req, res) => {
  Servicio.find()
    .exec()
    .then(function (result) {
      let filteredServicesByCategory = [];

      result.forEach(resService => {
        if (
            filteredServicesByCategory.some(
            service => service.categoria_servicio === resService.categoria_servicio && service.cantidad++
          )
        )
          return;
          filteredServicesByCategory.push({ categoria_servicio: resService.categoria_servicio, cantidad: 1 });
      });

      res.json(filteredServicesByCategory);
    })
    .catch(err => {
      res.json({ message: err });
    });
});

module.exports = router;