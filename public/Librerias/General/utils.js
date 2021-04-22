const verificarAcceso = rolesAutorizados => {
    try {
        const token = localStorage.getItem('token');
        const { role } = jwt_decode(token);
        return rolesAutorizados.includes(role);
    } catch (error) {
        cerrarSesion();
    }
};

const sinAutorizacionMsj = (msj) => {
    Swal.fire({
        title: 'Error!',
        text: msj,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    }).then(({ isConfirmed }) => {
        if (isConfirmed) {
            cerrarSesion();
        }
    });
};

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});