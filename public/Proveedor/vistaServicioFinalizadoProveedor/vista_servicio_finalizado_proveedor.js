
const cargarUsuario = () => {
  let infoFinalizado = localStorage.getItem('data-servicio-fin');
  let infoFinalizadoForm = JSON.parse(+infoFinalizado);
  let correo = infoFinalizadoForm.correo;
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
        console.log(json);
        // nombreProveedor = json[0].nombre;
        // apellido1Proveedor = json[0].apellido1;
        // apellido2Proveedor = json[0].apellido2;
        // direccion = json[0].direccion;
        // categoria_servicio = json[0].categoria_servicio

        //cargarPerfil();
      }
    )
}