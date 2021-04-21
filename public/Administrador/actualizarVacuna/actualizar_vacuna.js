document.querySelector('#revisarVacuna').addEventListener('click', e => {
    let revisar = document.getElementById("revisarVacuna");
    let error = revisarForm();
    if (!error) {
        revisar.setAttribute("href", "../listadoVacunas/listado_vacunas.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})