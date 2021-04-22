const cambiarContrasenna = async (contrasenna, token) => {
    try {
        const { data } = await axios.post('http://localhost:5000/usuarios/cambiar_contrasenna', { contrasenna, token });
        return data;
    } catch (error) {
        return error;   
    }
};

document.querySelector('#revisar').addEventListener('click', async (e) => {
    try {
        const error = revisarForm();
        const contrasenna = document.getElementById("contrasenna").value;
        const contrasennaConfirmar = document.getElementById("contrasennaConfirmar").value;
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!error) {
            if (token) {
                if (contrasenna === contrasennaConfirmar) {
                    const response = await cambiarContrasenna(contrasenna, token);
                    Swal.fire({
                        title: 'Éxito!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            window.location.href = `${location.origin}/General/login/login.html`;
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Cotraseñas no coinciden',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Token invalido',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Campo vacío',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});
