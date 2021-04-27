const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

let router = express.Router();

const TOKEN_SECRET = process.env.JWT_SECRET;

router.post('/send_email_calificar', (req, res) => {
    let { correo, proveedor, nombreServicio } = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'AppPetsWorld@gmail.com',
            pass: 'AppPetsWorld1!'
        }
    });

    const token = jwt.sign({ email: correo }, TOKEN_SECRET);

    var mailOptions = {
        from: 'AppPetsWorld@gmail.com',
        to: correo,
        subject: 'Calificar servicio',
        html: ` <div style="margin:  0 auto; width: 200px 10px;">
        <div style="text-align: center; padding-bottom: 200px;">
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/pets-world/image/upload/v1619470566/calificacionServicio_akdfjw.jpg" height="240px" width="300px" />
            </div>
            <p style="text-align: center; font-size: 35px;">Calificar servicio</p>
            <p style="margin: 30px; font-size: 16px;">Bienvenido, gracias por haber contratado ${nombreServicio} como servicio.<br /> Ahora tiene una calificación de servicio pendiente</p>
            <p style="margin: 30px; font-size: 16px;">Ha introducido ${correo} <br /> como la dirección de correo
                electrónico de su cuenta.</p>
            <p style="margin: 40px 10px; font-size: 15px;">Califique el servicio brindado haciendo clic en el botón a continuación.</p>
            <a href="http://localhost:5000/Cliente/calificacionServicio/calificacion_servicio.html"
                style="text-decoration: none; padding: 13px 120px; background-color: #005CE4; color: #fff; margin: 40px;">Verifique
                su cuenta</a>
    
        </div>

    </div>
    `
    }



    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });


});

module.exports = router;



