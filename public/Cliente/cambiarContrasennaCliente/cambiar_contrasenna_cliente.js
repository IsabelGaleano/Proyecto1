const cambiarContrasenna = async (contrasenna, token) => {
    try {
        const { data } = await axios.post('http://localhost:5000/usuarios/cambiar_contrasenna', { contrasenna, token });
        return data;
    } catch (error) {
        return error;   
    }
};

document.addEventListener("DOMContentLoaded", () => {
    try {
        const revisar = document.getElementById("actualizar");

        revisar.addEventListener("click", async () => {
            const error = revisarForm();
            const token = localStorage.getItem('token');
            const contrasenna = document.getElementById("contrasenna").value;
            const contrasennaConfirm = document.getElementById("contrasennaConfirm").value;
            
            if (!error) {
                if (contrasenna === contrasennaConfirm) {
                    const response = await cambiarContrasenna(contrasenna, token);

                    Swal.fire({
                        title: 'Éxito!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            console.log('do redirect');
                           // window.location.href = `${location.origin}/General/login/login.html`;
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Contraseñas no coinciden',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
            }
        });
    } catch (e) {
        Swal.fire({
            title: 'Error!',
            text: e.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
});

  
  