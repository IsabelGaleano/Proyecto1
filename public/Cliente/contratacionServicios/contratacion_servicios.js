document.querySelector('#contratarServicio').addEventListener('click', e => {
  let servicio = document.getElementById('contratarServicio');
  contratarServicio();
  solicitudProveedor();
  notificaciones();
  Swal.fire({
    title: 'Éxito!',
    text: 'Servicio contratado',
    icon: 'success',
    confirmButtonText: 'Aceptar'
})
  servicio.setAttribute("href", "../listadoServicios/listado_servicios.html")
 
})


const contratarServicio = () => {
  let cliente = localStorage.getItem('correo');
  let proveedor = localStorage.getItem('data-proveedorC');
  var datos = {
      proveedor: proveedor,
      cliente: cliente,
      tipo: "proveedor",
      estado: "pendiente",
      fecha: new Date(),
      fechaInicio: new Date(),
      fechaFin: new Date()
     
  }

  fetch("http://localhost:5000/solicitudes/insertar", {
      method: 'POST',
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



const solicitudProveedor = () => {
  let cliente = localStorage.getItem('correo');
  let proveedor = localStorage.getItem('data-proveedorC');
  var datos = {
      proveedor: proveedor,
      cliente: cliente,
      tipo: "cliente",
      estado: "pendiente",
      fecha: new Date(),
     
  }

  fetch("http://localhost:5000/solicitudes/insertar", {
      method: 'POST',
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



const notificaciones = () => {

    let proveedor = localStorage.getItem('data-proveedorC');
    let cliente = localStorage.getItem('correo');
    var datos = {
        receptor: proveedor,
        descripcion: "Ha solicitado su servicio",
        fecha: new Date(),
        emisor: cliente
       
    }
  
    fetch("http://localhost:5000/notificaciones/insertar", {
        method: 'POST',
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