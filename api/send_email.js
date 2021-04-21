const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send_email', (req, res) => {
    let { correo, contrasenna } = req.body;

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
        subject: 'Verificación de cuenta',
        html: ` <div style="margin:  0 auto; width: 200px 10px;">
        <div style="text-align: center; padding-bottom: 200px;">
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/pets-world/image/upload/v1618289287/verification_wqsm1f.jpg" height="220px" width="240px"" />
            </div>
            <p style="text-align: center; font-size: 35px;">Bienvenido a Pets World</p>
            <p style="margin: 30px; font-size: 16px;">Ha introducido ${correo} <br /> como la dirección de correo
                electrónico de su cuenta</p>
            <p style="margin: 30px; font-size: 16px;">La contraseña de su cuenta es: <span
                    style="font-weight: bold;">${contrasenna}</span></p>
            <p style="margin: 40px 10px; font-size: 15px;">Verifique su cuenta haciendo clic en el botón a continuación</p>
            <a href="http://localhost:5000/General/login/login.html"
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
    })


});

module.exports = router;



