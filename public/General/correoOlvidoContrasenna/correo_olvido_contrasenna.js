const enviarEmail = async () => {
    try {
        const correo = document.getElementById("correo").value;
        const { data } = await axios.post('http://localhost:5000/usuarios/send_email_restablecer', { correo });
        return data;
    } catch (error) {
        return error;   
    }
};

document.querySelector('#revisar').addEventListener('click', async (e) => {
    try {
        const error = revisarForm();
        const correo = document.getElementById("correo");
        const validar = validarEmail(correo.value);

        if (!error) {
            if (validar) {
                await enviarEmail();
                Swal.fire({
                    title: 'Éxito!',
                    text: 'Enviado',
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
                    text: 'Correo incorrecto',
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



