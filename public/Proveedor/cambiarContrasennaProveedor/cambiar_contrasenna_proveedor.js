document.querySelector('#revisarAdmin').addEventListener('click', e => {
    let revisar = document.getElementById("revisarAdmin");
    let error = revisarForm();
    if (!error) {
       
        revisar.setAttribute("href", "../perfilAdministrador/perfil_administrador.html")
        
  
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
  
    }
  
  
  })
  
  