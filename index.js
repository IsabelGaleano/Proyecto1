// Cargar variables de entorno .env
require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const pdfkit = require('pdfkit');
const jwt = require('jsonwebtoken');
const fs = require('fs');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const verify = (token) => {
    try {
        const verified = jwt.verify(token, 'w@veRabbit88316452!');
        return { valid : true, data : verified };
    } catch (error) {
        return { valid : false }
    }
}

const folder = path.join(__dirname, 'public');
const app = express();

app.use(cors());

 //Definiendo que hay una carpeta public
app.use(express.static(folder))//Use la carpeta public
app.use(express.json({ limit: '5mb' })); 

app.use((req, res, next) => {
    const token = req.headers.authorization;
    const decodedToken = verify(token);

    if (decodedToken.valid) {
        req.userId = decodedToken.data.userId;
        req.userRole = decodedToken.data.role;
    } else {
        req.userRole = 'public';
    }

    next();
});

app.use('/usuarios', require('./api/usuarios'));
app.use('/servicios', require('./api/servicios'));
app.use('/vacunas', require('./api/vacunas'));
app.use('/padecimientos', require('./api/padecimientos'));
app.use('/categorias_mascotas', require('./api/categorias_mascotas'));
app.use('/razas', require('./api/razas'));
app.use('/categorias_servicios', require('./api/categorias_servicios'));
app.use('/mascotas', require('./api/mascotas'));
app.use('/solicitudes_registros', require('./api/solicitudes_registros'));
app.use('/usuarios', require('./api/send_email'));
app.use('/usuarios', require('./api/send_email_autorizacion'));
app.use('/usuarios', require('./api/send_email_rechazo'));
app.use('/solicitudes', require('./api/solicitudes'));
app.use('/notificaciones', require('./api/notificaciones'));
app.use('/acciones', require('./api/acciones'));
app.use('/denuncias', require('./api/denuncias'));
app.use('/anuncios', require('./api/anuncios'));
app.use('/usuarios', require('./api/send_email_restablecer'));
app.use('/usuarios', require('./api/send_email_bloqueo_cliente'));
app.use('/usuarios', require('./api/factura'));
app.use('/usuarios', require('./api/send_email_contacto'));
app.use('/exportar_pdf', require('./api/exportar_pdf'));
app.use('/upload_preview', require('./api/upload_preview'));

app.listen(5000, function(){
    console.log("Servidor levantado");
});

