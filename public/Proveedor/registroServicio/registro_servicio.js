document.querySelector('#revisarServicio').addEventListener('click', e => {
    let revisar = document.getElementById("revisarServicio");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Success',
            text: 'Registro éxitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        revisar.setAttribute("href", "../landingPageProveedor/landing_page_proveedor.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})