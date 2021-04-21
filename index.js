const path = require('path');
const express = require('express');
const app = express(); //Inicializa express
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const pdfkit = require('pdfkit');
const fs = require('fs');


mongoose.connect('mongodb+srv://isabel_galeano:petsworldApp@database.0yilc.mongodb.net/PetsWorld?retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const folder = path.join(__dirname, 'public');
 //Definiendo que hay una carpeta public
app.use(express.static(folder))//Use la carpeta public
app.use(express.json());  
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
app.listen(5000, function(){
    console.log("Servidor levantado");
});

