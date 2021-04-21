document.addEventListener("DOMContentLoaded", () => {
    const iniciarSessionBtn = document.getElementById("iniciarSesion");
    const correo = document.getElementById("correo");
    const contrasenna = document.getElementById("contrasenna");

    iniciarSessionBtn.addEventListener("click", async (e) => {
        try {
            if (correo.value && contrasenna.value) {
                const { data } = await axios.post('http://localhost:5000/usuarios/login', {
                    correo: correo.value,
                    contrasenna: contrasenna.value
                });

                localStorage.setItem('token', data.token);
                localStorage.setItem('correo', data.correo);
                const role = data.role.toLowerCase();

                if (role == 'proveedor') {
                    window.location.href = `${location.origin}/Proveedor/landingPageProveedor/landing_page_proveedor.html`;
                } else if (role == 'cliente') {
                    window.location.href = `${location.origin}/Cliente/landingPageCliente/landing_page_cliente.html`;
                } else if (role == 'administrador') {
                    window.location.href = `${location.origin}/Administrador/landingPageAdministrador/landing_page_administrador.html`;
                } 
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Contraseña o correo electrónico incorrectos',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            
        }
    }, false);
});