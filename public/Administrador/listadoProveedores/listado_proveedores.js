
const enviarEmailBloqueo = correo => {
   
    let datos = {
        correo: correo
    }
    fetch("http://localhost:5000/usuarios/send_email_bloqueo_cliente", {
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