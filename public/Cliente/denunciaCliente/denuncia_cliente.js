document.querySelector('#revisarDenuncia').addEventListener('click', e => {
    let revisar = document.getElementById("revisarDenuncia");
    let error = revisarForm();
    if (!error) {

        Swal.fire({
            title: 'Éxito!',
            text: 'Denuncia enviada',
            icon: 'success',
            confirmButtonText: 'Aceptar'

        })
        registrarDenuncia();
        revisar.setAttribute("href", "../landingPageCliente/landing_page_cliente.html")


    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});




const registrarDenuncia = () => {
    let denunciante = localStorage.getItem('correo');
    //Aquí se extrae el correo del denunciado con localstorage pero por ahora será quemado
    let denunciado = "luwiisabel@gmail.com"
    var datos = {
        denunciante: denunciante,
        denunciado: denunciado,
        fecha: new Date(),
        motivo: document.getElementById('motivo').value,
        categoria: "proveedor"
    }

    fetch("http://localhost:5000/denuncias/insertar", {
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
            response.json({ message: err })
        });

}






