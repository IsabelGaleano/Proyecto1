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
                    imagen_usuario.setAttribute("src", json[i]?.imagen_usuario
                    ? json[i].imagen_usuario
                    : '../../img/agregarImg.jpg');
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
        imagen_usuario: document.getElementById('imagen_usuario').src,

    }
    insertarAccion();
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

const imgPreview = async (e) => {
    try {
        const img = e.files[0];
  
        if (img) {
            const base64Img = await toBase64(img);
            document.getElementById('imagen_usuario').src = base64Img;
        }
    } catch (e) {
        throw e;
    }
  };
  

  const insertarAccion = () => {
    let correo = localStorage.getItem('correo');
  
    let hoy = new Date();
    var infoAccion = {
      usuario: correo,
      accion: 'Actualizar perfil',
      fecha: hoy,
    };
  
    fetch('http://localhost:5000/acciones/insertar', {
      method: 'POST',
      body: JSON.stringify(infoAccion),
      headers: { 'Content-Type': 'application/json' },
    }).then(respuesta => {
      return respuesta.json();
    });
  };