
const getLocalCorreo = () => {
    var correo = localStorage.getItem('correo');
    return correo;
}


const enviarEmail = () => {
    let correo = getLocalCorreo();
    let datos = {
        correo: correo,
    }
    fetch("http://localhost:5000/usuarios/send_email_autorizacion", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            response.json({ message: err })
        });

}


const enviarEmailRechazo = () => {
    let correo = getLocalCorreo();
    let datos = {
        correo: correo,
    }
    fetch("http://localhost:5000/usuarios/send_email_rechazo", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            response.json({ message: err })
        });

}




