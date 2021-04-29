
document.querySelector('#revisarRaza').addEventListener('click', e => {
    let revisar = document.getElementById("revisarRaza");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso',
            icon: 'Success',
            confirmButtonText: 'Aceptar'
        });
        insertarRaza();
        revisar.setAttribute("href", "../listadoRazas/listado_razas.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});


const insertarRaza = () => {
    var datos = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        imagen: document.getElementById('img_categoria_servicio').src,
        categoria: document.getElementById("categoria").value
    }

    fetch("http://localhost:5000/razas/insertar", {
        method: 'POST',
        body: JSON.stringify(datos),
    headers: { 'Content-Type': 'application/json' },
    })
        .then(
            response => {
                return response.json();
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
