document.querySelector('#revisarVacuna').addEventListener('click', e => {
    let revisar = document.getElementById("revisarVacuna");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        insertarVacuna();

        revisar.setAttribute("href", "../listadoVacunas/listado_vacunas.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});


const insertarVacuna = () => {
    var datos = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById("imagen").value,
        categoria: document.getElementById("categoria").value
    }

    fetch("http://localhost:5000/vacunas/insertar", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            res.json({ message: err })
        });
    

}
