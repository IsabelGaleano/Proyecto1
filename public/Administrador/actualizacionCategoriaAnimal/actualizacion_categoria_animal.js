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
  console.log(datos);

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
      }
    });
};

const actualizarCategoria = (e) => {
  var datos = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    imagen: document.getElementById('imagen_nueva').files[0],
  };

  const formData = new FormData();
  for (let key in datos) {
    formData.append(key, datos[key]);
  }

  fetch('http://localhost:5000/categorias_mascotas/actualizar', {
    method: 'PUT',
    body: formData
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      response.json({ message: err });
    });
};

const loadImagePreview = fileInput => {
  var datos = {
    imagen: fileInput.files[0],
  };

  const formData = new FormData();
  for (let key in datos) {
    formData.append(key, datos[key]);
  }

  fetch('http://localhost:5000/upload_preview', {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      const filename = data.filename;
      let imgElement = document.getElementById('img_categoria_servicio');
      imgElement.src = `./../../uploads_preview/${filename}`;
    })
    .catch(err => {
      response.json({ message: err });
    });
};
