document.querySelector('#revisarMascota').addEventListener('click', e => {
    let revisar = document.getElementById("revisarMascota");
    let error = revisarForm();
    if (!error) {
        
        revisar.setAttribute("href", "../listadoMascotas/listado_mascotas.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})