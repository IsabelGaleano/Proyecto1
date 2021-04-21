document.querySelector('#revisarMascota').addEventListener('click', e => {
    let revisar = document.getElementById("revisarMascota");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
        revisar.setAttribute("href", "../../General/login/login.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})


