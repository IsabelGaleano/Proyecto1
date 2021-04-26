const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Servicio = require('../schemas/servicio');
const Usuario = require('../schemas/usuario');
const Categoria = require('../schemas/categoria_servicio');

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
        const cat = await Categoria.findById(categoria);
        console.log(cat);
        const servicios = await Servicio.find({ categoria_servicio: cat.nombre });
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

        const proveedor = await Servicio.findOne({ proveedor: req.body.proveedor });

        res.json({ proveedor });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post('/insertar', async (req, res) => {
    try {
        // //if (!['proveedor'].includes(req.userRole)) {
        //     res.status(403).json({ message: 'request no autorizado' });
        //     return;
        // }

        const usuario = await Usuario.findById(req.userId);

        //if (usuario?.estado === 'aprobado') {
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
        // } else {
        //    res.status(403).json({ message: 'request no autorizado' });
        // }
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

router.put('/actualizar', async (req, res) => {
    try {
        let proveedor = req.body.proveedor;

        // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
        const servicio = await Servicio.findOne({ proveedor });
        
        Servicio.findOneAndUpdate({ proveedor: proveedor }, {
            $set: {
                latitud_servicio: servicio.latitud_servicio,
                longitud_servicio:servicio.longitud_servicio,
                nivel_servicio: req.body.nivel_servicio,
                descripcion: req.body.descripcion,
                costo: req.body.costo,
                dias_servicio: req.body.dias_servicio,
                horario_servicio: req.body.horario_servicio,
                imagenes_servicio: req.body.imagenes_servicio,
                whatsapp: req.body.whatsapp,
                instagram: req.body.instagram,
                facebook: req.body.facebook,
                categoria_servicio: servicio.categoria_servicio,
            }
        }, { useFindAndModify: false, new: true }, (err, doc) => {
            res.json(doc);
        })
        .catch(err => {
            res.json({ message: err })
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post('/buscar_servicio_solicitudes', (req, res) => {
    Servicio.find({ proveedor: { $in: req.body.proveedor } }).exec()
        .then(
            result => {

                res.json(result);

            }

        )
        .catch(err => {
            res.json({ message: err })
        });


});

router.post('/buscar_servicios_proveedores', (req, res) => {
    Servicio.findOne({ proveedor: req.body.proveedor }).exec()
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