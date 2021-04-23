
const cargarPerfil = () => {
  let correo = localStorage.getItem('data-correo');
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
        for (let i = 0; json.length > i; i++) {
          nombre = `${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}`
          document.getElementById('correo').innerText = json[i].correo;
          document.getElementById('telefono').innerText = json[i].telefono;
          document.getElementById('genero').innerText = json[i].genero;
          document.getElementById('cantidad_mascotas').innerText = json[i].cantidad_mascotas;
          document.getElementById('direccion').innerText = json[i].direccion;
          document.getElementById('nombre').innerText = nombre;
          imagen_usuario.setAttribute("src", json[i].imagen_usuario);
          initMap(json[i].latitud, json[i].longitud);
         
        }


      }
    )
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

const obtenerFecha = (fechaNacimiento) => {

  fechaNacimientoNueva = new Date(fechaNacimiento);
  let year = fechaNacimientoNueva.getFullYear();
  let day = fechaNacimientoNueva.getDay();
  let month = fechaNacimientoNueva.getMonth();

  let fecha = `${day}/${month}/${year}`;
  return fecha;

}


const mascotas = () => {
  let correo = localStorage.getItem('data-correo');
  localStorage.setItem('data-correo-cliente', correo);
}








