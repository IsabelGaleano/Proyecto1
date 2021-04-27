document.querySelector('#revisarRaza').addEventListener('click', e => {
  let revisar = document.getElementById("revisarRaza");
  let error = revisarForm();
  if (!error) {
      Swal.fire({
          title: 'Éxito!',
          text: 'Registro éxitoso',
          icon: 'success',
          confirmButtonText: 'Aceptar'
      })
      actualizarRaza();
      revisar.setAttribute("href", "../listadoRazas/listado_razas.html")
      

  } else {
      Swal.fire({
          title: 'Error!',
          text: 'Campos vacíos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
      })

  }


})


const cargarSelect = () => {
  fetch("http://localhost:5000/categorias_mascotas")
      .then(
          response => {
              return response.json();
          }
      )

      .then(
          json => {
              let contListado = "";

              for (let i = 0; i < json.length; i++) {
                  contListado += `<option value="${json[i].nombre}">${json[i].nombre}</option>`;
              }

              document.getElementById('seleccion').innerHTML = contListado;

              setTimeout('cargarRaza()', 650);
          }
      )
}


const cargarRaza = () => {
  let nombre = localStorage.getItem('data-raza');
  var datos = {
    nombre: nombre
  }

  fetch("http://localhost:5000/razas/buscar", {
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

        let imagen = document.getElementById('imagen_nueva');
        for (let i = 0; json.length > i; i++) {
          document.getElementById('nombre').value = json[i].nombre;
          document.getElementById('descripcion').value = json[i].descripcion;
          imagen.setAttribute("src", json[i].imagen);
          document.getElementById('seleccion').value = json[i].categoria
        }
      }
    )
}


const actualizarRaza = () => {
  
  var datos = {
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("descripcion").value,
    imagen: document.getElementById("imagen_nueva").value,
    categoria: document.getElementById("seleccion").value
  }

  insertarAccion()

  fetch("http://localhost:5000/razas/actualizar", {
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


const insertarAccion = () => {
let correo = localStorage.getItem('correo');

  let hoy = new Date();
  var infoAccion = {
      usuario: correo,
      accion: "Actualizar raza",
      fecha: hoy
  }

  fetch("http://localhost:5000/acciones/insertar", {
      method: 'POST',
      body: JSON.stringify(infoAccion),
      headers: { 'Content-Type': 'application/json' }
  })
      .then(
          respuesta => {
              return respuesta.json();
          }
      );
}