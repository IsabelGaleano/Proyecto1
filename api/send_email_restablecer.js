const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send_email_restablecer', (req, res) => {
    let { correo } = req.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'AppPetsWorld@gmail.com',
            pass: 'AppPetsWorld1!'
        }
    });


    var mailOptions = {
        from: 'AppPetsWorld@gmail.com',
        to: correo,
        subject: 'Restablecer contraseña',
        html: `<div style="margin:  0 auto; width: 200px 10px;">
        <div style="text-align: center; padding-bottom: 200px;">
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/pets-world/image/upload/v1618528289/forgot_rts612.jpg" height="240px" width="260px" />
            </div>
            <p style="text-align: center; font-size: 35px;">¿Olvidó su contraseña?</p>
            <p style="margin: 30px; font-size: 18px;">No se preocupe</p>
            <p style="margin: 30px; font-size: 14px;">Para restablecer su contraseña, haga clic en el botón de abajo</p>
          
            <a href="http://localhost:5000/General/restablecerContrasenna/restablecer_contrasenna.html"
                style="text-decoration: none; padding: 13px 120px; background-color: #e40000; color: #fff; margin: 40px; font-size: 16px;">Restablecer contraseña</a>
    
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



