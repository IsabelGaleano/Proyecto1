
const cargarPerfil = () => {
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
        let nombre;
        for (let i = 0; json.length > i; i++) {
          nombre = `${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}`
          document.getElementById('correo').innerText = json[i].correo;
          document.getElementById('telefono').innerText = json[i].telefono;
          document.getElementById('tipo_identificacion').innerText = json[i].tipo_identificacion;
          document.getElementById('identificacion').innerText = json[i].identificacion;
          document.getElementById('telefono').innerText = json[i].telefono;
          document.getElementById('nombre').innerText = nombre;
         
        }


      }
    )
}

const servicio = () => {
  let correo = localStorage.getItem('data-proveedorSP');
  localStorage.setItem('data-correoServicio', correo);
}