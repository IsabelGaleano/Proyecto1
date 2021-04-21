const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send_email_rechazo', (req, res) => {
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
        subject: 'Rechazo de registro',
        html: ` <div style="margin:  0 auto; width: 200px 10px;">
        <div style="text-align: center; padding-bottom: 200px;">
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/pets-world/image/upload/v1618429109/rechazo_registro_xndbcs.jpg" height="240px" width="260px" />
            </div>
            <p style="text-align: center; font-size: 35px;">Rechazo de registro</p>
            
            <p style="margin: 30px; font-size: 17px;">Ha introducido ${correo} <br /> como la dirección de correo
                electrónico de su cuenta.</p>
                <p style="margin: 30px; font-size: 17px;">Lamentablemente su cuenta no cumple con los requisitos<br /> 
                    adecuados para ser parte de la comunidad de Pets World. <br/> Gracias por su solicitud de registro.
                </p>
                <p style="margin: 40px 10px; font-size: 15px;">Si desea contactarse con nosotros haga clic el botón a continuación</p>
                <a href="http://localhost:5000/General/contacto/contacto.html"
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



