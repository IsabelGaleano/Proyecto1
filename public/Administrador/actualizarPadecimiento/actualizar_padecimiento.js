document.querySelector('#revisarPadecimiento').addEventListener('click', e => {
    let revisar = document.getElementById("revisarPadecimiento");
    let error = revisarForm();
    if (!error) {

        revisar.setAttribute("href", "../listadoPadecimientos/listado_padecimientos.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})