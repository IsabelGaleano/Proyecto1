const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
let router = express.Router();

let Usuario = require('../schemas/usuario');
const TOKEN_SECRET = process.env.JWT_SECRET;

router.post('/send_email_restablecer', async (req, res) => {
    try {
        const { correo } = req.body;
        const usuario = await Usuario.findOne({ correo }).exec();

        if (usuario) {
            const token = jwt.sign({ email: usuario.correo }, TOKEN_SECRET);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'AppPetsWorld@gmail.com',
                    pass: 'AppPetsWorld1!'
                }
            });
        
            const mailOptions = {
                from: 'AppPetsWorld@gmail.com',
                to: usuario.correo,
                subject: 'Restablecer contraseña',
                html: `
                    <div style="margin:  0 auto; width: 200px 10px;">
                        <div style="text-align: center; padding-bottom: 200px;">
                            <div style="text-align: center;">
                                <img src="https://res.cloudinary.com/pets-world/image/upload/v1618528289/forgot_rts612.jpg" height="240px" width="260px" />
                            </div>
                            <p style="text-align: center; font-size: 35px;">¿Olvidó su contraseña?</p>
                            <p style="margin: 30px; font-size: 18px;">No se preocupe</p>
                            <p style="margin: 30px; font-size: 14px;">Para restablecer su contraseña, haga clic en el botón de abajo</p>
                  
                        <a href="http://localhost:5000/General/restablecerContrasenna/restablecer_contrasenna.html?token=${token}"
                        style="text-decoration: none; padding: 13px 120px; background-color: #e40000; color: #fff; margin: 40px; font-size: 16px;">Restablecer contraseña</a>
                    </div>
                `
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.json({ message: error.message, success: false });
                } else {
                    res.json({ message: info.response, success: true });
                }
            });
        } else {
            res.json({ message: 'usuario no existe', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
