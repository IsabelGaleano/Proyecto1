/*document.querySelector('#iniciarSesion').addEventListener('click', e => {
    let error = revisarForm();
    if(!error) {
        cambiarVista();
    }
    
});
function revisarForm() {
    let elements = document.getElementsByClassName("form-validate");
    let error = false;

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i].value;
        elements[i].addEventListener('keyup', e => {
            e.target.classList.remove('pw-form--error');
        });

        if (element.trim() == "") {
            error = true;
            elements[i].classList.add('pw-form--error');
            
        }
    }
    if (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        
    }
    
    return error;

}

function cambiarVista() {
    let correo = document.getElementById("correo");
    let contrasenna = document.getElementById("contrasenna");
    let iniciarSesion = document.getElementById("iniciarSesion");

    if (correo.value == "acorralesf@gmail.com" && contrasenna.value == "acorralesf") {
        iniciarSesion.setAttribute("href", "../../Administrador/landingPageAdministrador/landing_page_administrador.html")

    } else if(correo.value == "avargasc@gmail.com" && contrasenna.value == "avargasc") {
        iniciarSesion.setAttribute("href", "../../Proveedor/landingPageProveedor/landing_page_proveedor.html")
    } else if(correo.value == "daranah@gmail.com" && contrasenna.value == "daranah") {
        iniciarSesion.setAttribute("href", "../../Cliente/landingPageCliente/landing_page_cliente.html")
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Contraseña o correo electrónico incorrectos!',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }


}*/
