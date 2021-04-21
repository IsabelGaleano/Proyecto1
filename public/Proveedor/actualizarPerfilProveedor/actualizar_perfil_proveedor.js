
document.querySelector('#revisarProveedor').addEventListener('click', e => {
  let revisar = document.getElementById("revisarProveedor");
  let error = revisarForm();
  let correo = document.getElementById("correo");
  let validar = validarEmail(correo.value);
  let cedula = document.getElementById('identificacion').value;
  let tipo = document.getElementById('tipoCedula').value;
  let validacionCedula = getCedula(cedula, tipo);
  if (!error) {
      let fechaNacimiento = calcularEdad();
      if(fechaNacimiento >= 18) {
          if(validar) {
              if(validacionCedula) {
                  revisar.setAttribute("href", "../perfilProveedor/perfil_proveedor.html")
  
              } else {
                  Swal.fire({
                      title: 'Error!',
                      text: 'Cédula incorrecta',
                      icon: 'error',
                      confirmButtonText: 'Aceptar'
                  })
  
  
              }
          } else {
              Swal.fire({
                  title: 'Error!',
                  text: 'Correo incorrecto',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
              })

          }     
          
      } else {
          Swal.fire({
              title: 'Error!',
              text: 'No es mayor de edad',
              icon: 'error',
              confirmButtonText: 'Aceptar'
          })
  
      }

  } else {
      Swal.fire({
          title: 'Error!',
          text: 'Campos vacíos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
      })

  }


})