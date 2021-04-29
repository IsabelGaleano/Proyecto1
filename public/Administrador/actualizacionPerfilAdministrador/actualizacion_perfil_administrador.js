document.querySelector('#revisarAdmin').addEventListener('click', e => {
    let revisar = document.getElementById("revisarAdmin");
    let error = revisarForm();
    if (!error) {
        actualizarUsuario();
        revisar.setAttribute("href", "../perfilAdministrador/perfil_administrador.html")


    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})



const cargarPerfil = () => {
    let correo = localStorage.getItem('correo');
    var datos = {
        correo: correo
    }

    fetch("http://localhost:5000/usuarios/buscar", {
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
                let imagen_usuario = document.getElementById('imagen_usuario');
                for (let i = 0; json.length > i; i++) {
                    document.getElementById('nombre').value = json[i].nombre;
                    document.getElementById('apellido1').value = json[i].apellido1;
                    document.getElementById('apellido2').value = json[i].apellido2;
                    document.getElementById('correo').value = json[i].correo;
                    document.getElementById('telefono').value = json[i].telefono;
                    imagen_usuario.setAttribute("src", json[i].imagen_usuario);
                }


            }
        )
}


const actualizarUsuario = () => {

    var datos = {
        nombre: document.getElementById("nombre").value,
        apellido1: document.getElementById("apellido1").value,
        apellido2: document.getElementById("apellido2").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value,
        imagen_usuario: document.getElementById("imagen_usuario").value

    }

    fetch("http://localhost:5000/usuarios/actualizar", {
        method: 'PUT',
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


