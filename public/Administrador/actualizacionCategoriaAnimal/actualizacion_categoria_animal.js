document.querySelector('#revisarCategoria').addEventListener('click', e => {
    let revisar = document.getElementById("revisarCategoria");
    let error = revisarForm();
    if (!error) {
    
        revisar.setAttribute("href", "../listadoCategoriaAnimales/listado_categorias_animales.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})