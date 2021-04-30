let nombreProveedor;
let apellido1Proveedor;
let apellido2Proveedor;
let direccion;
let categoria_servicio;
let latitud;
let longitud;
let imagenUsuario;
const cargarUsuario = () => {
  let correo = localStorage.getItem('data-solicitudFin');
  //let infoCursoForm = JSON.parse(infoCurso);
  //let correo = infoCursoForm.correo;
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
        nombreProveedor = json[0].nombre;
        apellido1Proveedor = json[0].apellido1;
        apellido2Proveedor = json[0].apellido2;
        direccion = json[0].direccion;
        categoria_servicio = json[0].categoria_servicio;
        latitud = json[0].latitud;
        longitud = json[0].longitud;
        imagenUsuario = json[0].imagen_usuario;
        cargarPerfil();
      }
    )
}


const cargarPerfil = () => {
  let correo = localStorage.getItem('data-solicitudFin');
  // let infoCursoForm = JSON.parse(infoCurso);
  // let correo = infoCursoForm.correo;
  // let fecha = infoCursoForm.fecha;

  var datos = {
    proveedor: correo
  }

  fetch("http://localhost:5000/servicios/buscar_servicios_proveedores", {
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
   

        let nombre = `${nombreProveedor} ${apellido1Proveedor} ${apellido2Proveedor}`
        document.getElementById('nombre_servicio').innerText = json.nombre_servicio;
        document.getElementById('costo').innerText = json.costo;
        document.getElementById('categoria_servicio').innerText = json.categoria_servicio;
        document.getElementById('direccion').innerText = direccion;
        document.getElementById('nombre').innerText = nombre;
        document.getElementById('imagenUsuario').src = imagenUsuario;
        initMap(latitud, longitud);

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

const denunciar = () => {
  let correo = localStorage.getItem('data-solicitudFin');
  localStorage.setItem('correoDenunciaP', correo);

}