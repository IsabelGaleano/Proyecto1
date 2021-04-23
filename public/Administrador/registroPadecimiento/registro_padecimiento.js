document.querySelector('#revisarPadecimiento').addEventListener('click', e => {
    let revisar = document.getElementById("revisarPadecimiento");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar'

            
        });

        insertarPadecimiento();
        revisar.setAttribute("href", "../listadoPadecimientos/listado_padecimientos.html")


    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });

    }


});


const insertarPadecimiento = () => {
    var datos = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value,
        categoria: document.getElementById("categoria").value
    }

    fetch("http://localhost:5000/padecimientos/insertar", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        );

}


