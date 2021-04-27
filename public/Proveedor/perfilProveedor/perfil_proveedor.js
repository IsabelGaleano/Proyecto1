const cargarInfoProveedorPerfil = () => {
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
        let nombrePerfil;
        let fechaNacimiento;
        for (let i = 0; json.length > i; i++) {
          fechaNacimiento = obtenerFecha(json[i].fecha_nacimiento);
          nombrePerfil = `${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}`;
          document.getElementById('nombrePerfil').innerText = nombrePerfil;
          document.getElementById('correo').innerText = json[i].correo;
          document.getElementById('tipo_identificacion').innerText = json[i].tipo_identificacion;
          document.getElementById('identificacion').innerText = json[i].identificacion;
          document.getElementById('telefono').innerText = json[i].telefono;
          document.getElementById('fecha_nacimiento').innerText = fechaNacimiento;
          document.getElementById('provincia').innerText = json[i].provincia;
          document.getElementById('canton').innerText = json[i].canton;
          document.getElementById('distrito').innerText = json[i].distrito;
        }
      }
    )
}

const saveProviderName = () => {
  let nombreNav = document.getElementById('nombreNav').innerText;
  localStorage.setItem(nombreNav);
  console.log(nombreNav);
}


const obtenerFecha = (fechaNacimiento) => {

  fechaNacimientoNueva = new Date(fechaNacimiento);
  let year = fechaNacimientoNueva.getFullYear();
  let day = fechaNacimientoNueva.getDay();
  let month = fechaNacimientoNueva.getMonth();

  let fecha = `${day}/${month}/${year}`;
  return fecha;

}

