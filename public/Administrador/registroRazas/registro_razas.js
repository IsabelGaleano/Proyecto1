
document.querySelector('#revisarRaza').addEventListener('click', e => {
    let revisar = document.getElementById("revisarRaza");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso',
            icon: 'Success',
            confirmButtonText: 'Aceptar'
        });
        insertarRaza();
        revisar.setAttribute("href", "../listadoRazas/listado_razas.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});


const insertarRaza = () => {
    var datos = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value,
        categoria: document.getElementById("categoria").value
    }

    fetch("http://localhost:5000/razas/insertar", {
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
