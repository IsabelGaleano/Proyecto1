
document.querySelector('#revisarServicio').addEventListener('click', e => {
  let revisar = document.getElementById("revisarServicio");
  let error = revisarForm();
  if (!error) {

    actualizarServicio();
    revisar.setAttribute("href", "../perfilProveedor/perfil_proveedor.html")


  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Campos vacíos',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })

  }


});



const cargarServicio = () => {
  let correo = localStorage.getItem('correo');
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
        document.getElementById('descripcion').value = json.descripcion;
        document.getElementById('nombreServicio').value = json.nombre_servicio;
        document.getElementById('costo').value = json.costo;
        document.getElementById('whatsapp').value = json.whatsapp;
        document.getElementById('instagram').value = json.instagram;
        document.getElementById('facebook').value = json.facebook;
        setCategorias(json.categoria_servicio);
        cargarHorarios(json.horario_servicio, json.dias_servicio)
        buscarNivel(json.nivel_servicio);

        document.getElementById('imagenServicio').src = json?.imagenes_servicio[0]
          ? json.imagenes_servicio[0]
          : '../../img/agregarImg.jpg';





      }
    )
}


const imgPreview = async (e) => {
  try {
    const img = e.files[0];

    if (img) {
      const base64Img = await toBase64(img);
      document.getElementById('imagenServicio').src = base64Img;
    }
  } catch (e) {
    throw e;
  }
};


const cargarHorarios = (horario_servicio, dias_servicio) => {
  let lunes = document.getElementById('checkLunes');
  let martes = document.getElementById('checkMartes');
  let miercoles = document.getElementById('checkMiercoles');
  let jueves = document.getElementById('checkJueves');
  let viernes = document.getElementById('checkViernes');
  let sabado = document.getElementById('checkSabado');
  let domingo = document.getElementById('checkDomingo');

  for (let i = 0; i < horario_servicio.length; i++) {

    if (lunes.value == dias_servicio[i]) {
      lunes.checked = true;
      document.getElementById('horarioLunes').value = horario_servicio[i];

    } else if (martes.value == dias_servicio[i]) {
      martes.checked = true;
      document.getElementById('horarioMartes').value = horario_servicio[i];

    } else if (miercoles.value == dias_servicio[i]) {
      miercoles.checked = true;
      document.getElementById('horarioMiercoles').value = horario_servicio[i];

    } else if (jueves.value == dias_servicio[i]) {
      jueves.checked = true;
      document.getElementById('horarioJueves').value = horario_servicio[i];

    } else if (viernes.value == dias_servicio[i]) {
      viernes.checked = true;
      document.getElementById('horarioViernes').value = horario_servicio[i];

    } else if (sabado.value == dias_servicio[i]) {
      sabado.checked = true;
      document.getElementById('horarioSabado').value = horario_servicio[i];

    } else {
      domingo.checked = true;
      document.getElementById('horarioDomingo').value = horario_servicio[i];
    }




  }



}



const cargarCategoriasServicios = () => {
  fetch("http://localhost:5000/categorias_servicios/")
    .then(
      response => {
        return response.json();
      }
    )
    .then(
      json => {
        let listado;
        for (let i = 0; i < json.length; i++) {
          listado = ` <option value="${json[i].nombre}">${json[i].nombre}</option>`
          document.getElementById("categoriaServicio").insertAdjacentHTML("beforeend", listado);
        }
      }
    )

}


const cargarInfoProveedor = () => {
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
        console.log(json)
        for (let i = 0; json.length > i; i++) {
          document.getElementById('direccion').value = json[0].direccion;
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

  marker = new google.maps.Marker({
    position: myLatlng,
    title: "Hello World!",
    map: map,
    draggable: true
  });


  // To add the marker to the map, call setMap();
  marker.setMap(map);

}


const setCategorias = categoria => {
  var select = document.getElementById("categoriaServicio");
  for (let i = 1; i < select.length; i++) {
    if (select.options[i].text == categoria) {

      select.selectedIndex = i;

    }
  }
}

window.addEventListener('load', e => {
  cargarCategoriasServicios();
  cargarServicio();
  cargarInfoProveedor();

})

const actualizarServicio = () => {
  let positions = getPosition();
  let correo = localStorage.getItem('correo');
  let nombre_servicio = document.getElementById('nombreServicio').value;
  let nivel_servicio = radioValue();
  let descripcion = document.getElementById('descripcion').value;
  let costo = document.getElementById('costo').value;
  let dias_servicio = obtenerDias();
  let horario_servicio = obtenerHorarios();
  let whatsapp = document.getElementById('whatsapp').value;
  let facebook = document.getElementById('facebook').value;
  let instagram = document.getElementById('instagram').value;
  let categoriaServicio = document.getElementById('categoriaServicio').value;
  var datos = {
    proveedor: correo,
    nombre_servicio: nombre_servicio,
    nivel_servicio: nivel_servicio,
    descripcion: descripcion,
    costo: costo,
    dias_servicio: dias_servicio,
    horario_servicio: horario_servicio,
    whatsapp: whatsapp,
    facebook: facebook,
    instagram: instagram,
    latitud: positions.lat,
    longitud: positions.lng,
    categoria_servicio: categoriaServicio,
    estado: "activo",
    imagenes_servicio: document.getElementById('imagenServicio').src
  }
  insertarAccion();
  fetch("http://localhost:5000/servicios/actualizar", {
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



const radioValue = () => {
  let radios = document.getElementsByName('nivel');
  let radio;
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radio = radios[i].value;
      return radio;
    }
  }
}

const obtenerDias = () => {
  let dias_servicio = [];
  var inputElements = document.getElementsByClassName('checkDias');
  for (let i = 0; i < inputElements.length; ++i) {
    if (inputElements[i].checked) {
      dias_servicio.push(inputElements[i].value);

    }
  }
  return dias_servicio;
}

const obtenerHorarios = () => {
  let horario_servicio = [];
  var inputElements = document.getElementsByClassName('checkDias');
  let inputHorarios = document.getElementsByClassName('checkHorario');
  for (let i = 0; i < inputElements.length; ++i) {

    if (inputElements[i].checked) {

      horario_servicio.push(inputHorarios[i].value);

    }
  }
  return horario_servicio;
}

const getPosition = () => {

  let lat = marker.getPosition().lat();
  let lng = marker.getPosition().lng();
  return {
    lat, lng
  }

}


const buscarNivel = nivel => {
  let nacional = document.getElementById('nacional');
  let canton = document.getElementById('canton');
  let distrito = document.getElementById('distrito');

  if (nacional.value === nivel) {
    nacional.checked = true;
  } else if (canton.value === nivel) {
    canton.checked = true;
  } else {
    distrito.checked = true;
  }

}

const insertarAccion = () => {
  let correo = localStorage.getItem('correo');

  let hoy = new Date();
  var infoAccion = {
    usuario: correo,
    accion: 'Actualizar servicio',
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
