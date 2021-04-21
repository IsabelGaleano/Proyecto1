document.querySelector('#revisarMascota').addEventListener('click', e => {
  let revisar = document.getElementById("revisarMascota");
  let error = revisarForm();
  if (!error) {
     
      revisar.setAttribute("href", "../perfilMascota/perfil_mascota.html")
      

  } else {
      Swal.fire({
          title: 'Error!',
          text: 'Campos vacíos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
      })

  }


})


