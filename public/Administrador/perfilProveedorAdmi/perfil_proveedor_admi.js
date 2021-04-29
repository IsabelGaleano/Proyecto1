

const cargarProveedor = () => {
  let correo = localStorage.getItem('providerEmail');
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
        for (let i = 0; json.length > i; i++) {
          fechaNacimiento = obtenerFecha(json[i].fecha_nacimiento);
          nombre = `${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}`
          document.getElementById('correo').innerText = json[i].correo;
          document.getElementById('tipo_identificacion').innerText = json[i].tipo_identificacion;
          document.getElementById('identificacion').innerText = json[i].identificacion;
          document.getElementById('telefono').innerText = json[i].telefono;
          document.getElementById('fecha_nacimiento').innerText = fechaNacimiento;
          document.getElementById('provincia').innerText = json[i].provincia;
          document.getElementById('canton').innerText = json[i].canton;
          document.getElementById('distrito').innerText = json[i].distrito;
          document.getElementById('nombre').innerText = nombre;
          imagen_usuario.setAttribute("src", json[i].imagen_usuario);
        }
      }
    )
}

const obtenerFecha = (fechaNacimiento) => {

  let fechaNacimientoNueva = new Date(fechaNacimiento);
  let year = fechaNacimientoNueva.getFullYear();
  let day = fechaNacimientoNueva.getDay();
  let month = fechaNacimientoNueva.getMonth();

  let fecha = `${day}/${month}/${year}`;
  return fecha;
}

const servicio = () => {
  let correo = localStorage.getItem('providerEmail');
  localStorage.setItem('data-correoServicioA', correo);
}