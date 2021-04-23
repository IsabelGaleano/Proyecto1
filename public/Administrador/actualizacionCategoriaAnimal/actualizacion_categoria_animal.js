document.querySelector('#revisarCategoria').addEventListener('click', e => {
    let revisar = document.getElementById("revisarCategoria");
    let error = revisarForm();
    if (!error) {
        actualizarCategoria();
        revisar.setAttribute("href", "../listadoCategoriaAnimales/listado_categorias_animales.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})

const cargarCategoria = () => {
    let nombre = localStorage.getItem('data-nombre');
    var datos = {
      nombre: nombre
    }
    console.log(datos)
  
    fetch("http://localhost:5000/categorias_mascotas/buscar", {
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
          let imagen = document.getElementById('imagen_nueva');
          for (let i = 0; json.length > i; i++) {
            document.getElementById('nombre').value = json[i].nombre;
            document.getElementById('descripcion').value = json[i].descripcion;
            imagen.setAttribute("src", json[i].imagen);
  
          }
  
  
        }
      )
  }
  

  const actualizarCategoria = () => {
    var datos = {
      nombre: document.getElementById("nombre").value,
      descripcion: document.getElementById("descripcion").value,
      imagen: document.getElementById("imagen_nueva").value
    }
  
    fetch("http://localhost:5000/categorias_mascotas/actualizar", {
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