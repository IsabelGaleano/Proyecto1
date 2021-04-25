const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Solicitud = require('../schemas/solicitud');
const Servicios = require('../schemas/servicio');

router.get('/', (req, res) => {
    Solicitud.find().exec()
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
    var solicitudNueva = new Solicitud({
        _id: new mongoose.Types.ObjectId(),
        proveedor: req.body.proveedor,
        cliente: req.body.cliente,
        tipo: req.body.tipo,
        estado: req.body.estado,
        fecha: req.body.fecha
    });

    solicitudNueva.save()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });

});

/*router.post('/buscar', (req, res) => {
    Solicitud.find({ tipo: req.body.tipo}).exec()
        .then(
            result => {
                res.json(result);
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
});*/

router.post('/cliente/buscar', async (req, res) => {
    try {
        if (!['cliente', 'administrador'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }

        const { criterioBusqueda, tipo, estado, cliente } = req.body;
        const solicitudes = await Solicitud.find({ tipo, estado, cliente });
        const proveedores = solicitudes.map(({ proveedor }) => proveedor);
        const servicios = await Servicios.find({ 
            nombre_servicio: { '$regex': criterioBusqueda, '$options': 'i' },
            proveedor: { $in: proveedores}
        });
        
        res.json(servicios);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post('/proveedor/buscar', async (req, res) => {
    try {
        if (!['proveedor', 'administrador'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }
        
        const { criterioBusqueda, tipo, estado, proveedor } = req.body;
        const solicitudes = await Solicitud.find({ tipo, estado, proveedor });
        const proveedores = solicitudes.map(({ proveedor }) => proveedor);
        const servicios = await Servicios.find({ 
            nombre_servicio: { '$regex': criterioBusqueda, '$options': 'i' },
            proveedor: { $in: proveedores}
        });
        
        res.json(servicios);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});


router.post('/buscar', async (req, res) => {
    try {
        if (!['proveedor', 'administrador'].includes(req.userRole)) {
            res.status(403).json({ message: 'request no autorizado' });
            return;
        }

        const { tipo, estado, cliente, proveedor } = req.body;
        const solicitudes = await Solicitud.find({ 
            tipo, 
            estado,
            proveedor,
            cliente: { '$regex': cliente, '$options': 'i' } 
        });
        
        res.json(solicitudes);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

router.post('/buscar_solicitudes_pendientes_proveedor', (req, res) => {
    Solicitud.find({ $and: 
        [
            {tipo: req.body.tipo},
            { proveedor: req.body.proveedor}, 
            { estado: req.body.estado}
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

router.post('/buscar_solicitudes_pendientes_cliente', (req, res) => {
    Solicitud.find({ $and: 
        [
            { tipo: req.body.tipo },
            { cliente: req.body.cliente}, 
            { estado: req.body.estado}
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


router.post('/buscar', (req, res) => {
    Solicitud.find({ tipo: req.body.tipo}).exec()
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
    Solicitud.findOneAndDelete({ tipo: req.body.tipo }).exec()
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
    let cliente = req.body.cliente;
    let proveedor = req.body.proveedor;
    let  = req.body.tipo;
    let estado = req.body.estado;
    let fecha = req.body.fecha;
   
    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Solicitud.findOneAndUpdate(
        {cliente: cliente}, {$set:{
            proveedor:proveedor,
            tipo:tipo,
            estado:estado,
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

router.put('/actualizar_solicitudes', (req, res) => {
    let cliente = req.body.cliente;
    let proveedor = req.body.proveedor;
    let estado = req.body.estado;

    // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
    Solicitud.updateMany({ cliente: cliente, proveedor:proveedor }, { $set:{ estado:estado }}, 
        {useFindAndModify: false, new: true}, (err, doc) =>{
      res.json(doc);
    })
    .catch(err => {
        res.json({ message: err })
    });
    
  });

module.exports = router;