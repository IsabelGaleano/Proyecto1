document.querySelector('#revisarPadecimiento').addEventListener('click', e => {
  let revisar = document.getElementById('revisarPadecimiento');
  let error = revisarForm();
  if (!error) {
    Swal.fire({
      title: 'Éxito!',
      text: 'Registro éxitoso',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
    actualizarPadecimiento();
    revisar.setAttribute(
      'href',
      '../listadoPadecimientos/listado_padecimientos.html'
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

const cargarSelect = () => {
  fetch('http://localhost:5000/categorias_mascotas')
    .then(response => {
      return response.json();
    })

    .then(json => {
      let contListado = '';

      for (let i = 0; i < json.length; i++) {
        contListado += `<option value="${json[i].nombre}">${json[i].nombre}</option>`;
      }

      document.getElementById('seleccion').innerHTML = contListado;

      setTimeout('cargarPadecimiento()', 650);
    });
};

const cargarPadecimiento = () => {
  let nombre = localStorage.getItem('data-padecimiento');
  var datos = {
    nombre: nombre,
  };

  fetch('http://localhost:5000/padecimientos/buscar', {
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
        document.getElementById('seleccion').value = json[i].categoria;
      }
    });
};

const actualizarPadecimiento = () => {
  var datos = {
    nombre: document.getElementById('nombre').value,
    descripcion: document.getElementById('descripcion').value,
    imagen: document.getElementById('imagen_nueva').files[0],
    categoria: document.getElementById('seleccion').value,
  };

  const formData = new FormData();
  for (let key in datos) {
    formData.append(key, datos[key]);
  }

  insertarAccion();

  fetch('http://localhost:5000/padecimientos/actualizar', {
    method: 'PUT',
    body: formData,
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
    accion: 'Actualizar padecimiento',
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
