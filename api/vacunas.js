const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();

let Vacuna = require('../schemas/vacuna');

router.get('/listar/:categoria', async (req, res) => {
    try {
        const { categoria } = req.params;
        const vacunas = await Vacuna.find({ categoria });
        res.json(vacunas);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

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
    Vacuna.find({ nombre: {'$regex': req.body.nombre, '$options': 'i'}}).exec()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
});

router.get('/buscar/:id', async (req, res) => {
    try {
        if (!['administrador'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }

        const { id } = req.params;
        const vacuna = await Vacuna.findById(id);

        res.json(vacuna);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.delete('/eliminar/:id', async (req, res) => {
    try {
        if (!['administrador'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }

        const vacuna = await Vacuna.findOneAndDelete({ _id : req.params.id });

        res.json(vacuna);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.put('/actualizar', async (req, res) => {
    try {
        if (!['administrador'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }

        const { _id, nombre, descripcion, imagen, categoria } = req.body;

        const vacunaActualizada = await Vacuna.findOneAndUpdate({ _id }, {
            nombre,
            descripcion,
            imagen,
            categoria
        }, { new: true });

        if (!vacunaActualizada) {
            res.status(404).json({ message: "reques invalido", success: false });
            return;
        }

        res.json(vacunaActualizada);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
