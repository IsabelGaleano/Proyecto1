document.querySelector('#revisarCategoria').addEventListener('click', e => {
    let revisar = document.getElementById("revisarCategoria");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso',
            icon: 'Success',
            confirmButtonText: 'Aceptar'
        })
        insertarInfo();
        revisar.setAttribute("href", "../listadoCategoriaServicios/listado_categorias_servicios.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});


const insertarInfo = () => {
    var infoCatServicio = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById('img_categoria_servicio').src
    }

    insertarAccion();
    fetch("http://localhost:5000/categorias_servicios/insertar", {
        method: 'POST',
        body: JSON.stringify(infoCatServicio),
    headers: { 'Content-Type': 'application/json' },
    })
        .then(
            respuesta => {
                return respuesta.json();
            }
        );
}

const imgPreview = async e => {
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

  
  const insertarAccion = () => {
    let correo = localStorage.getItem('correo');
  
    let hoy = new Date();
    var infoAccion = {
      usuario: correo,
      accion: 'Registrar categoría de servicios',
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
