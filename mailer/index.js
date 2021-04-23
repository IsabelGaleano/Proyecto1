const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const enviarEmail = async (mailOptions) => {
    return new Promise((resolve,reject)=>{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
}

const restablecerContrasenna = async (email) => {
    try {
        const token = jwt.sign({ email }, TOKEN_SECRET);
        const mailOptions = {
            from: process.env.MAILER_USER,
            to: email,
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

        return await enviarEmail(mailOptions);
    } catch (e) {
        throw e;
    }
};

const usuarioAprobado = async (email) => {
    try {
        const token = jwt.sign({ email }, TOKEN_SECRET);
        const mailOptions = {
            from: process.env.MAILER_USER,
            to: email,
            subject: 'Autorización de registro',
            html: ` 
                <div style="margin:  0 auto; width: 200px 10px;">
                    <div style="text-align: center; padding-bottom: 200px;">
                        <div style="text-align: center;">
                            <img src="https://res.cloudinary.com/pets-world/image/upload/v1618424474/autorizacion_proveedor_eyvcuh.jpg" height="240px" width="260px" />
                        </div>
                        <p style="text-align: center; font-size: 35px;">Bienvenido a Pets World</p>
                        <p style="margin: 30px; font-size: 16px;">Bienvenido, gracias por haberse registrado.<br /> Ahora eres proveedor oficial de Pets World.</p>
                        <p style="margin: 30px; font-size: 16px;">Ha introducido ${email} <br /> como la dirección de correo electrónico de su cuenta.</p>
                        <p style="margin: 40px 10px; font-size: 15px;">Verifique su cuenta haciendo clic en el botón a continuación.</p>
                        
                        <a href="http://localhost:5000/General/restablecerContrasenna/restablecer_contrasenna.html?token=${token}"
                        style="text-decoration: none; padding: 13px 120px; background-color: #e40000; color: #fff; margin: 40px; font-size: 16px;">Verifique su cuenta</a>
                    </div>
                </div>
            `
        }

        return await enviarEmail(mailOptions);
    } catch (e) {
        throw e;
    }
};

const usuarioRechazado = async (email) => {
    try {
        const mailOptions = {
            from: process.env.MAILER_USER,
            to: email,
            subject: 'Rechazo de registro',
            html: `
                <div style="margin:  0 auto; width: 200px 10px;">
                    <div style="text-align: center; padding-bottom: 200px;">
                        <div style="text-align: center;">
                            <img src="https://res.cloudinary.com/pets-world/image/upload/v1618429109/rechazo_registro_xndbcs.jpg" height="240px" width="260px" />
                        </div>
                        <p style="text-align: center; font-size: 35px;">Rechazo de registro</p>
            
                        <p style="margin: 30px; font-size: 17px;">Ha introducido ${email} <br /> como la dirección de correo
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

        return await enviarEmail(mailOptions);
    } catch (e) {
        throw e;
    }
};

module.exports = { restablecerContrasenna, usuarioAprobado, usuarioRechazado};
