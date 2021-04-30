document.querySelector('#revisarCategoria').addEventListener('click', e => {
  let revisar = document.getElementById('revisarCategoria');
  let error = revisarForm();
  if (!error) {
    actualizarCategoria();
    revisar.setAttribute(
      'href',
      '../listadoCategoriaAnimales/listado_categorias_animales.html'
    );
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Campos vacíos',
      icon: 'error',
      confirmButtonText: 'Aceptar',
    });
  }
});

const cargarCategoria = () => {
  let nombre = localStorage.getItem('data-nombre');
  var datos = {
    nombre: nombre,
  };

  fetch('http://localhost:5000/categorias_mascotas/buscar', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      let imagen = document.getElementById('img_categoria_servicio');
      for (let i = 0; json.length > i; i++) {
        document.getElementById('nombre').value = json[i].nombre;
        document.getElementById('descripcion').value = json[i].descripcion;
        imagen.setAttribute('src', `./../../uploads/${json[i].imagen}`);
        document.getElementById('img_categoria_servicio').src = json[i]?.imagen ? json[i].imagen : '../../img/agregarImg.jpg';
      }
    });
};

const actualizarCategoria = (e) => {
  var datos = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    imagen: document.getElementById('img_categoria_servicio').src
  };

  insertarAccion();
  fetch('http://localhost:5000/categorias_mascotas/actualizar', {
    method: 'PUT',
    body: JSON.stringify(datos),
    headers: {'Content-Type': 'application/json'}
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      response.json({ message: err });
    });
};


const insertarAccion = () => {
  let correo = localStorage.getItem('correo');

  let hoy = new Date();
  var infoAccion = {
    usuario: correo,
    accion: 'Actualizar categoría de mascotas',
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

const imgPreview = async (e) => {
  try {
      const img = e.files[0];

      if (img) {
          const base64Img = await toBase64(img);
          document.getElementById('img_categoria_servicio').src = base64Img;
      }
  } catch (e) {
      throw e;
  }
};