document.querySelector('#revisar').addEventListener('click', e => {
    let revisar = document.getElementById("revisar");
    let error = revisarForm();
    let correo = document.getElementById("correo");
    let validar = validarEmail(correo.value);
    if (!error) {

        if (validar) {
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



})


