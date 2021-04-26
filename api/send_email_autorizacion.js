const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

let router = express.Router();

const TOKEN_SECRET = process.env.JWT_SECRET;

router.post('/send_email_autorizacion', (req, res) => {
    let { correo } = req.body;

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
        subject: 'Autorización de registro',
        html: ` <div style="margin:  0 auto; width: 200px 10px;">
        <div style="text-align: center; padding-bottom: 200px;">
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/pets-world/image/upload/v1618424474/autorizacion_proveedor_eyvcuh.jpg" height="240px" width="260px" />
            </div>
            <p style="text-align: center; font-size: 35px;">Bienvenido a Pets World</p>
            <p style="margin: 30px; font-size: 16px;">Bienvenido, gracias por haberse registrado.<br /> Ahora eres proveedor oficial de Pets World.</p>
            <p style="margin: 30px; font-size: 16px;">Ha introducido ${correo} <br /> como la dirección de correo
                electrónico de su cuenta.</p>
            <p style="margin: 40px 10px; font-size: 15px;">Verifique su cuenta haciendo clic en el botón a continuación.</p>
            <a href="http://localhost:5000/General/restablecerContrasenna/restablecer_contrasenna.html?token=${token}"
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



