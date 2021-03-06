const cargarProveedorInfo = () => {
    let correo = localStorage.getItem('providerEmailInfo');
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
          let nombre;
          let fechaNacimiento;
          for (let i = 0; json.length > i; i++) {
            nombre = `${json[i].nombre}`
            fechaNacimiento = obtenerFecha(json[i].fecha_nacimiento);
            document.getElementById('correo').innerText = json[i].correo;
            document.getElementById('tipo_identificacion').innerText = json[i].tipo_identificacion;
            document.getElementById('identificacion').innerText = json[i].identificacion;
            document.getElementById('fecha_nacimiento').innerText = fechaNacimiento;
            document.getElementById('provincia').innerText = json[i].provincia;
            document.getElementById('canton').innerText = json[i].canton;
            document.getElementById('distrito').innerText = json[i].distrito;
            document.getElementById('nombre').innerText = nombre;
            document.getElementById('apellido1').innerText = json[i].apellido1;
            document.getElementById('apellido2').innerText = json[i].apellido2;
            document.getElementById('direccion').innerText = json[i].direccion;
            initMap(json[i].latitud, json[i].longitud);
          }
        }
      )
  }
  

  
const aceptarProveedor = () => {
    activarProveedor();
    enviarEmail();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Solicitud de registro aceptada',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(setAceptar(), 5000);
      accionAceptar();
    
  }
  const setAceptar = () => {
    let aceptar = document.getElementById('aceptar');
    aceptar.setAttribute("href", "../listadoSolicitudesRegistro/listado_solicitudes_registro.html");
  }

const enviarEmail = () => {
    let correo = localStorage.getItem('providerEmailInfo');
    let datos = {
        correo: correo,
    }
    fetch("http://localhost:5000/usuarios/send_email_autorizacion", {
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


const eliminar = () => {
    let correo = localStorage.getItem('providerEmailInfo');
    let eliminar = document.getElementById('eliminar');
    Swal.fire({
        title: 'Est?? seguro?',
        text: "??No podr?? revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'S??, eliminarlo!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'El usuario ha sido eliminado.',
            'success'
          )
          deleteProvider(correo);
          enviarEmailRechazo(correo);
          insertarAccion();
          eliminar.setAttribute("href", "../listadoSolicitudesRegistro/listado_solicitudes_registro.html");
        }
      })
}



const deleteProvider = (correo) => {
    
    var datos = {
        correo: correo
    }
    fetch("http://localhost:5000/usuarios/eliminar", {
    method: 'DELETE',
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

const enviarEmailRechazo = correo => {
    let datos = {
        correo: correo,
    }
    fetch("http://localhost:5000/usuarios/send_email_rechazo", {
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


const activarProveedor = () => {
    let correo = localStorage.getItem('providerEmailInfo');
    let estado = "activo"
    var datos = {
      correo: correo,
      estado: estado
    }
    
    fetch("http://localhost:5000/usuarios/actualizar_estado", {
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
  
  

  const obtenerFecha = (fechaNacimiento) => {
  
    let fechaNacimientoNueva = new Date(fechaNacimiento);
    let year = fechaNacimientoNueva.getFullYear();
    let day = fechaNacimientoNueva.getDay();
    let month = fechaNacimientoNueva.getMonth();
  
    let fecha = `${day}/${month}/${year}`;
    return fecha

  }


// Initialize and add the map
function initMap(lat, lng) {
  var myLatlng = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  marker = new google.maps.Marker({
    position: myLatlng,
    title: "Hello World!",
    map: map,
    draggable: true
  });


  // To add the marker to the map, call setMap();
  marker.setMap(map);

}


const accionAceptar = () => {
  let correo = localStorage.getItem('correo');

  let hoy = new Date();
  var infoAccion = {
    usuario: correo,
    accion: 'Aceptar proveedor',
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


const insertarAccion = () => {
  let correo = localStorage.getItem('correo');

  let hoy = new Date();
  var infoAccion = {
    usuario: correo,
    accion: 'Rechazar proveedor',
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

