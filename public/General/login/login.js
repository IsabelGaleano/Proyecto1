const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { authorization: localStorage.getItem('token') }
});

document.addEventListener("DOMContentLoaded", () => {
    const iniciarSessionBtn = document.getElementById("iniciarSesion");
    const correo = document.getElementById("correo");
    const contrasenna = document.getElementById("contrasenna");

    iniciarSessionBtn.addEventListener("click", async (e) => {
        try {
            if (correo.value && contrasenna.value) {
                const { data } = await api.post('usuarios/login', {
                    correo: correo.value,
                    contrasenna: contrasenna.value
                });

                localStorage.setItem('token', data.token);
                localStorage.setItem('correo', data.correo);
                const role = data.role.toLowerCase();

                if (role == 'proveedor') {
                    const servicio = await api.post('servicios/buscar', 
                    { proveedor: data.correo },
                    { headers: { 
                        authorization: data.token
                    }});

                    if (servicio.data.proveedor.estado === 'pendiente') {
                        window.location.href = `${location.origin}/Proveedor/registroServicio/registro_servicio.html`;
                    } else {
                        window.location.href = `${location.origin}/Proveedor/landingPageProveedor/landing_page_proveedor.html`;
                    }
                } else if (role == 'cliente') {
                    window.location.href = `${location.origin}/Cliente/landingPageCliente/landing_page_cliente.html`;
                } else if (role == 'administrador') {
                    window.location.href = `${location.origin}/Administrador/landingPageAdministrador/landing_page_administrador.html`;
                } 
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            
        }
    }, false);
});



const insertarAccion = () => {
    let correo = document.getElementById('correo');
  
    let hoy = new Date();
    var infoAccion = {
      usuario: correo,
      accion: 'Iniciar sesión',
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