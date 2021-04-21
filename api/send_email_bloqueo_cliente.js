const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send_email_bloqueo_cliente', (req, res) => {
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
        subject: 'Cuenta bloqueada',
        html: ` <div style="margin:  0 auto; width: 200px 10px;">
        <div style="text-align: center; padding-bottom: 200px;">
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/pets-world/image/upload/v1618810407/UserRemove_emuhyz.png" height="150px" width="150px" />
            </div>
            <p style="text-align: center; font-size: 35px;">Cuenta bloqueada</p>
            
                <p style="margin: 30px; font-size: 17px;">Lamentablemente su cuenta ${correo} <br/>ha sido bloqueada debido a que infringe <br /> 
                    las normas de seguridad de Pets World. <br/> 
                </p>
                <p style="margin: 40px 10px; font-size: 15px;">Si desea contactarse con nosotros haga clic en el botón a continuación</p>
                <a href="http://localhost:5000/General/login/login.html"
                    style="text-decoration: none; padding: 13px 120px; background-color: #005CE4; color: #fff; margin: 40px;">Contacto</a>
            
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



