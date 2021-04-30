

cargarProvincias();
var marker;
document.querySelector('#revisarCliente').addEventListener('click', e => {
  let revisar = document.getElementById("revisarCliente");
  let error = revisarForm();
  let correo = document.getElementById("correo");
  let validar = validarEmail(correo.value);
  let cedula = document.getElementById('identificacion').value;
  let tipo = document.getElementById('tipo_identificacion').value;
  let validacionCedula = getCedula(cedula, tipo);

  if (!error) {
    let fechaNacimiento = calcularEdad();
    if (fechaNacimiento >= 18) {
      if (validar) {
        if (validacionCedula) {
          actualizarUsuario();
          revisar.setAttribute("href", "../perfilCliente/perfil_cliente.html")

        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Cédula incorrecta',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })


        }

      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Correo incorrecto',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })

      }


    } else {
      Swal.fire({
        title: 'Error!',
        text: 'No es mayor de edad',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })

    }

  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Campos vacíos',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })

  }


});


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

        let nombre;
        let imagen_usuario = document.getElementById('imagen_usuario');
        let fechaNacimiento;
        let keyProvincia;
        for (let i = 0; json.length > i; i++) {
          fechaNacimiento = format(json[i].fecha_nacimiento);
          document.getElementById('nombre').value = json[i].nombre;
          document.getElementById('apellido1').value = json[i].apellido1;
          document.getElementById('apellido2').value = json[i].apellido2;
          document.getElementById('correo').value = json[i].correo;
          document.getElementById('identificacion').value = json[i].identificacion;
          document.getElementById('telefono').value = json[i].telefono;
          buscarGenero(json[i].genero);
          document.getElementById('cantidad_mascotas').value = json[i].cantidad_mascotas;
          fechaNacimiento = format(json[i].fecha_nacimiento)
          document.getElementById('fecha_nacimiento').value = fechaNacimiento;
          document.getElementById('direccion').value = json[i].direccion;
          buscarTipoIdenficacion(json[i].tipo_identificacion);
          setProvincia(json[i].provincia, json[i].canton,json[i].distrito);
          imagen_usuario.setAttribute("src", json[i]?.imagen_usuario
          ? json[i].imagen_usuario
          : '../../img/agregarImg.jpg');
          initMap(json[i].latitud, json[i].longitud);

        }


      }
    )
}


const actualizarUsuario = () => {
  let positions = getPosition();
  let radio = radioValue();
  let tipo_usuario = "cliente"
  let imagen_usuario = document.getElementById('imagen_usuario').src
  let idProvincia = document.getElementById("provincia").value;
  let provincia = getProvincia(idProvincia);
  let idCanton = document.getElementById("canton").value;
  let canton = getCanton(idCanton);
  let idDistrito = document.getElementById("distrito").value;
  let distrito = getDistrito(idDistrito);
  var datos = {
    nombre: document.getElementById("nombre").value,
    apellido1: document.getElementById("apellido1").value,
    apellido2: document.getElementById("apellido2").value,
    correo: document.getElementById("correo").value,
    tipo_identificacion: document.getElementById("tipo_identificacion").value,
    identificacion: document.getElementById("identificacion").value,
    fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
    telefono: document.getElementById("telefono").value,
    genero: radio,
    cantidad_mascotas: document.getElementById("cantidad_mascotas").value,
    provincia: provincia,
    canton: canton,
    distrito: distrito,
    direccion: document.getElementById("direccion").value,
    latitud: positions.lat,
    longitud: positions.lng,
    tipo_usuario: tipo_usuario,
    imagen_usuario: imagen_usuario,
    promedio_calificacion: null,
    estado: null
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

// Initialize and add the map
function initMap() {
  var myLatlng = new google.maps.LatLng(9.9333, -84.0833);
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

const obtenerFecha = (fechaNacimiento) => {

  let fecha = `${new Date(fechaNacimiento).getUTCFullYear()}-${new Date(fechaNacimiento).getUTCMonth() + 1}-${new Date(fechaNacimiento).getUTCDate()}`;
  return fecha;

}


function format(date) {
  date = new Date(date);

  var day = ('0' + date.getDate()).slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return year + '-' + month + '-' + day;
}

const buscarTipoIdenficacion = tipoIdentificacion => {
  var select = document.getElementById("tipo_identificacion");
  for (let i = 1; i < select.length; i++) {
    if (select.options[i].text == tipoIdentificacion) {

      select.selectedIndex = i;



    }
  }
}


const setProvincia = (nameProvincia, nameCanton, nameDistrito) => {
  fetch('https://ubicaciones.paginasweb.cr/provincias.json')
    .then(res => res.json())
    .then(data => {
      let provincias = document.getElementById('provincia');//Obtengo el elemento select

      for (const [key, value] of Object.entries(data)) {

        if (value === nameProvincia) { //Aquí comparo si el valor (que es el nombre de la provincia) es igual al valor que paso por parametros
          provincias.selectedIndex = key - 1;

        }
      }
      setCanton(nameCanton, nameDistrito);
    });

}


const setCanton = (nameCanton, nameDistrito) => {
  let provincia = document.getElementById('provincia').value;
  let url = "https://ubicaciones.paginasweb.cr/provincia/" + provincia + "/cantones.json";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let cantones = document.getElementById('canton');//Obtengo el elemento select
      for (const [key, value] of Object.entries(data)) {

        if (value === nameCanton) {
          cantones.selectedIndex = key - 1;
          let linea = "<option value='" + key + "' selected>" + value + "</option>";
          cantones.insertAdjacentHTML('beforeend', linea)

        }
      }
      setDistrito(nameDistrito);

    });

}

const setDistrito = nameDistrito => {
  let provincia = document.getElementById('provincia').value;
  let canton = document.getElementById('canton').value;
  let url = "https://ubicaciones.paginasweb.cr/provincia/" + provincia + "/canton/" +canton +"/distritos.json"
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let distritos = document.getElementById('distrito');//Obtengo el elemento select
      for (const [key, value] of Object.entries(data)) {

        if (value === nameDistrito) {
          distritos.selectedIndex = key -1;
          let linea = "<option value='" + key + "' selected>" + value + "</option>";
          distritos.insertAdjacentHTML('beforeend', linea)

        }
      }

    });

}



const buscarGenero = genero => {
  let femenino = document.getElementById('femenino');
  let masculino = document.getElementById('masculino');
  let otro = document.getElementById('otro');
  
  if (femenino.value === genero) {
    femenino.checked = true;
  } else if (masculino.value === genero) {
    masculino.checked = true;
  } else {
    otro.checked = true;
  }

}

const getPosition = () => {

  let lat = marker.getPosition().lat();
  let lng = marker.getPosition().lng();
  return {
    lat, lng
  }

}


const radioValue = () => {
  let radios = document.getElementsByName('gender');
  let radio;
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radio = radios[i].value;
      return radio;
    }

  }

}

const getProvincia = idProvincia => {

  let provincias = document.getElementById('provincia').childNodes;
  for (let i = 0; i < provincias.length; i++) {
    if (provincias[i].tagName === 'OPTION') {
      if (provincias[i].value == idProvincia) {
        return provincias[i].innerText;
      }

    }

  }

}

const getCanton = idCanton => {

  let cantones = document.getElementById('canton').childNodes;
  for (let i = 0; i < cantones.length; i++) {
    if (cantones[i].tagName === 'OPTION') {
      if (cantones[i].value == idCanton) {
        return cantones[i].innerText;
      }

    }

  }

}

const getDistrito = idDistito => {

  let distritos = document.getElementById('distrito').childNodes;
  for (let i = 0; i < distritos.length; i++) {
    if (distritos[i].tagName === 'OPTION') {
      if (distritos[i].value == idDistito) {
        return distritos[i].innerText;
      }

    }
  }

}


const obtenerVacunas = () => {
  let vacunas = [];
  var inputElements = document.getElementsByClassName('checkVacunas');
  for (let i = 0; i < inputElements.length; ++i) {
      if (inputElements[i].checked) {
          vacunas.push(inputElements[i].value);

      }
  }

  return vacunas;
}



const obtenerPadecimientos = () => {
  let padecimientos = [];
  var inputElements = document.getElementsByClassName('checkPadecimientos');
  for (let i = 0; i < inputElements.length; ++i) {
      if (inputElements[i].checked) {
          padecimientos.push(inputElements[i].value);

      }
  }

  return padecimientos;
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











