
let correo;

const cargarPerfil = () => {
  let infoCurso = localStorage.getItem('data-cliente-curso');
  let infoCursoForm = JSON.parse(infoCurso);
  correo = infoCursoForm.correo;
  let fecha = infoCursoForm.fecha;
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
        console.log(json)
        let nombre;
        let imagen_usuario = document.getElementById('imagen_usuario');
        let fechaServicio;
        for (let i = 0; json.length > i; i++) {
          fechaServicio = obtenerFecha(fecha);
          nombre = `${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}`
          document.getElementById('correo').innerText = json[i].correo;
          document.getElementById('telefono').innerText = json[i].telefono;
          document.getElementById('genero').innerText = json[i].genero;
          document.getElementById('cantidad_mascotas').innerText = json[i].cantidad_mascotas;
          document.getElementById('fechaServicio').innerText = fechaServicio
          document.getElementById('direccion').innerText = json[i].direccion;
          document.getElementById('nombre').innerText = nombre;
          imagen_usuario.setAttribute("src", json[i].imagen_usuario);
          initMap(json[i].latitud, json[i].longitud);
        }


      }
    )
}



const obtenerFecha = (fechaNacimiento) => {

  fechaNacimientoNueva = new Date(fechaNacimiento);
  let year = fechaNacimientoNueva.getFullYear();
  let day = fechaNacimientoNueva.getDay();
  let month = fechaNacimientoNueva.getMonth();

  let fecha = `${day}/${month}/${year}`;
  return fecha;

}

// Initialize and add the map
function initMap(lat, lng) {
  var myLatlng = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  var marker = new google.maps.Marker({
    position: myLatlng,
    title: "Hello World!",
    map: map,
    draggable: true
  });


  // To add the marker to the map, call setMap();
  marker.setMap(map);

}


const enviar = () => {
  actualizarEstado();
  notificaciones();
  cargarServicio();
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Servicio finalizado',
    showConfirmButton: false,
    timer: 4000
  })
  setAttribute();
}

const setAttribute = () => {
  let finalizar = document.getElementById('finalizarServicio');
  finalizar.setAttribute("href", "../listadoServiciosCurso/listado_servicios_curso.html")
}



const actualizarEstado = () => {
  let proveedor = localStorage.getItem('correo');
  let cliente = correo;
  let fechaInicio = document.getElementById('horaInicio').value;
  let fechaFin = document.getElementById('horaFin').value;
  var datos = {
    proveedor: proveedor,
    cliente: cliente,
    estado: "finalizado",
    fechaInicio: fechaInicio,
    fechaFin: fechaFin
  }

  fetch("http://localhost:5000/solicitudes/actualizar_solicitudes_curso", {
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


const notificaciones = cliente => {
  let proveedor = localStorage.getItem('correo');
  var datos = {
      receptor: correo,
      descripcion: "Ha finalizado su servicio",
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



const cargarServicio = () => {
  let correo = localStorage.getItem('data-correo');
  var datos = {
    proveedor: correo
  }
  fetch("http://localhost:5000/servcio/buscar_servicios_proveedores", {
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
        
        let nombreServicio = json.nombre_servicio;
        let proveedor = json.proveedor;
        enviarEmail(proveedor, nombreServicio);
      
      }
    )
}

const enviarEmail = (proveedor, nombreServicio) => {
  let datos = {
      correo: correo,
      proveedor: proveedor,
      nombreServicio: nombreServicio

  }
  fetch("http://localhost:5000/usuarios/send_email_calificar", {
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


