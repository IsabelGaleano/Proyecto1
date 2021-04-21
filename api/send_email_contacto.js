const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send_email_contacto', (req, res) => {
    let { correo, nombre, apellido, telefono, mensaje } = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'AppPetsWorld@gmail.com',
            pass: 'AppPetsWorld1!'
        }
    });

    var mailOptions = {
        from: correo,
        to: 'AppPetsWorld@gmail.com',
        subject: 'Verificación de cuenta',
        html: ` <div style="margin:  0 auto; width: 200px 10px;">
        <div style="padding-left: 100px; padding-bottom: 200px; padding-top: 60px; ">
            <p style="font-size: 20px; font-weight: bold;">Información de contacto</p>
            <p style="margin: 15px 0px; font-size: 16px;"><span style="font-weight: bold;">Correo electrónico:
                </span> ${correo} </p>
            <p style="margin: 15px 0px; font-size: 16px;"><span style="font-weight: bold;">Nombre y apellido:
                </span>${nombre} ${apellido} </p>
            <p style="margin: 15px 0px; font-size: 16px;"><span style="font-weight: bold;">Teléfono:
                </span>${telefono}</p>
            <p style="margin: 15px 0px; font-size: 16px;"><span style="font-weight: bold;">Mensaje: 
                </span>${mensaje}</p>

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
    })


});

module.exports = router;



