
const cargarPerfil = () => {
  let infoCurso = localStorage.getItem('data-fin');
  let infoCursoForm = JSON.parse(infoCurso);
  let correo = infoCursoForm.correo;
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


const denunciar = () => {
  let infoCurso = localStorage.getItem('data-fin');
  let infoCursoForm = JSON.parse(infoCurso);
  let correo = infoCursoForm.correo;
  localStorage.setItem('correoDenunciaC', correo);

}