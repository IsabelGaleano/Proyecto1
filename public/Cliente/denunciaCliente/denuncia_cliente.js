
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
    let denunciado = localStorage.getItem('correoDenunciaP');
    var datos = {
        denunciante: denunciante,
        denunciado: denunciado,
        fecha: new Date(),
        motivo: document.getElementById('motivo').value,
        categoria: "proveedor"
    }
    insertarAccion();
    cargarNotificacion();
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

    let cliente = localStorage.getItem('correo');
    var datos = {
        receptor: administrador,
        descripcion: "Ha realizado una denuncia",
        fecha: new Date(),
        emisor: cliente

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



const insertarAccion = () => {
    let correo = localStorage.getItem('correo');
  
    let hoy = new Date();
    var infoAccion = {
      usuario: correo,
      accion: 'Denunciar proveedor',
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






