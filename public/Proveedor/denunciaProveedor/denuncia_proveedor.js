document.querySelector('#revisarDenuncia').addEventListener('click', e => {
    let revisar = document.getElementById("revisarDenuncia");
    let error = revisarForm();
    if (!error) {

       
        registrarDenuncia();
        cargarNotificacion();
        Swal.fire({
            title: 'Éxito!',
            text: 'Denuncia enviada',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 1500
        })
       
        setTimeout(cambio(), 6000);

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});

const cambio = () => {
    let revisar = document.getElementById("revisarDenuncia");
    revisar.setAttribute("href", "../landingPageProveedor/landing_page_proveedor.html")

}


const registrarDenuncia = () => {
    let denunciante = localStorage.getItem('correo');
    //Aquí se extrae el correo del denunciado con localstorage pero por ahora será quemado
    let denunciado = localStorage.getItem('correoDenunciaC');
    var datos = {
        denunciante: denunciante,
        denunciado: denunciado,
        fecha: new Date(),
        motivo: document.getElementById('motivo').value,
        categoria: "cliente"
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



const cargarNotificacion = () => {
    let tipoUsuario = "administrador";
    var datos = {
        tipo_usuario: tipoUsuario
    }

    fetch("http://localhost:5000/usuarios/buscar_tipo_usuario", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                console.log(json);
                for (let i = 0; i < json.length; i++) {
                    notificaciones(json[0].correo);

                }


            }
        )
}




const notificaciones = administrador => {

    let proveedor = localStorage.getItem('correo');
    var datos = {
        receptor: administrador,
        descripcion: "Ha realizado una denuncia",
        fecha: new Date(),
        emisor: proveedor

    }

    fetch("http://localhost:5000/notificaciones/insertar", {
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












