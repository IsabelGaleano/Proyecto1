document.querySelector('#revisar').addEventListener('click', e => {
    let revisar = document.getElementById("revisar");
    let error = revisarForm();
    let correo = document.getElementById("correo");
    let validar = validarEmail(correo.value);
    if (!error) {

        if (validar) {
            enviarEmail();
            Swal.fire({
                title: 'Éxito!',
                text: 'Enviado',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })

            revisar.setAttribute("href", "../login/login.html")
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
            text: 'Campo vacío',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }



});


const enviarEmail = () => {
    let datos = {
        correo: document.getElementById("correo").value,

    }
    fetch("http://localhost:5000/usuarios/send_email_restablecer", {
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



