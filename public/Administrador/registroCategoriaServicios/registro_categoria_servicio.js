document.querySelector('#revisarCategoria').addEventListener('click', e => {
    let revisar = document.getElementById("revisarCategoria");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso',
            icon: 'Success',
            confirmButtonText: 'Aceptar'
        })
        insertarInfo();
        revisar.setAttribute("href", "../listadoCategoriaServicios/listado_categorias_servicios.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});


const insertarInfo = () => {
    var infoCatServicio = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value
    }

    fetch("http://localhost:5000/categorias_servicios/insertar", {
        method: 'POST',
        body: JSON.stringify(infoCatServicio),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            respuesta => {
                return respuesta.json();
            }
        );
}