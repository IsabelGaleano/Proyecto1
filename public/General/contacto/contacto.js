document.querySelector('#revisarContacto').addEventListener('click', e => {
    let revisar = document.getElementById("revisarContacto");
    let error = revisarForm();
    let correo = document.getElementById("correo");
    let validar = validarEmail(correo.value);
    if (!error) {
        if(validar) {
            Swal.fire({
                title: 'Éxito!',
                text: 'Mensaje enviado',
                icon: 'Success',
                confirmButtonText: 'Aceptar'

            })
            enviarEmail();
            revisar.setAttribute("href", "../../index.html")
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Correo incorrecto',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })

        }    

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})



const enviarEmail = () => {
    let datos = {
        correo: document.getElementById("correo").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        telefono: document.getElementById("telefono").value,
        mensaje: document.getElementById("mensaje").value,
    }
    fetch("http://localhost:5000/usuarios/send_email_contacto", {
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
