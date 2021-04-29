var swiper = new Swiper(".swiper-container", {
  speed: 1500,
  loop: true,
  // autoplay: {
  //     delay: 500
  // },
  plugins: [SwiperPluginAutoPlay]
});

const cargarServicio = () => {
  let correo = localStorage.getItem('data-proveedorSP');
  var datos = {
    proveedor: correo
  }
  console.log(correo)

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
        console.log(json)

        document.getElementById('descripcion').innerText = json.descripcion;
        document.getElementById('nombreServicio').innerText = json.nombre_servicio;
        document.getElementById('precioServicio').innerText = json.costo;
        document.getElementById('numeroCelular').innerText = json.whatsapp;
        document.getElementById('instagram').innerText = json.instagram;
        document.getElementById('facebook').innerText = json.facebook;
        document.getElementById('categoria_servicio').innerText = json.categoria_servicio
        cargarHorarios(json.horario_servicio)

      }
    )
}

const cargarHorarios = horario_servicio => {
  let lunes = document.getElementById('checkLunes');
  let martes = document.getElementById('checkMartes');
  let miercoles = document.getElementById('checkMiercoles');
  let jueves = document.getElementById('checkJueves');
  let viernes = document.getElementById('checkViernes');
  let sabado = document.getElementById('checkSabado');
  let domingo = document.getElementById('checkDomingo');

  for (let i = 0; i < horario_servicio.length; i++) {

    if (lunes.checked == true) {
      document.getElementById('horario_servicio_lunes').innerText = horario_servicio[i];
    } else {
      document.getElementById('horario_servicio_lunes').innerText = "";
    }

    if (martes.checked == true) {
      document.getElementById('horario_servicio_martes').innerText = horario_servicio[i];
    } else {
      document.getElementById('horario_servicio_martes').innerText = "";
    }

    if (miercoles.checked == true) {
      document.getElementById('horario_servicio_miercoles').innerText = horario_servicio[i];
    } else {
      document.getElementById('horario_servicio_miercoles').innerText = "";
    }

    if (jueves.checked == true) {
      document.getElementById('horario_servicio_jueves').innerText = horario_servicio[i];
    } else {
      document.getElementById('horario_servicio_jueves').innerText = "";
    }

    if (viernes.checked == true) {
      document.getElementById('horario_servicio_viernes').innerText = horario_servicio[i];
    } else {
      document.getElementById('horario_servicio_viernes').innerText = "";
    }

    if (sabado.checked == true) {
      document.getElementById('horario_servicio_sabado').innerText = horario_servicio[i];
    } else {
      document.getElementById('horario_servicio_sabado').innerText = "";
    }

    if (domingo.checked == true) {
      document.getElementById('horario_servicio_domingo').innerText = horario_servicio[i];
    } else {
      document.getElementById('horario_servicio_domingo').innerText = "";
    }

  }



}

window.addEventListener('load', e => {
  cargarInfoProveedor();
  cargarServicio();

})

const cargarInfoProveedor = () => {
  let correo = localStorage.getItem('data-proveedorSP');
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
        for (let i = 0; json.length > i; i++) {
          document.getElementById('ubicacionServicio').innerText = json[0].direccion;
          initMap(json[0].latitud, json[0].longitud);
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



