const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { authorization: localStorage.getItem('token') }
});

const cargarUsuarioActual = async () => {
    try {
        const { data } = await api.get('usuarios/actual');
        return data;
    } catch (e) {
        return e;
    }
};

const cargarCategoriaServicio = async () => {
    try {
        const { data } = await api.get('categorias_servicios');
        return data;
    } catch (e) {
        return e;
    }
};

const registrarServicio = async (servicio) => {
    try {
        const { data } = await api.put('servicios/actualizar', servicio);
        return data;
    } catch (e) {
        return e;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
    // Verificar si el current user esta autorizado
    const autorizado = verificarAcceso(['proveedor']);

    const registrarServicioBtn = document.getElementById('registrarServicio');
    const categoriaServicio = document.getElementById('seleccionar');
    const descripcionServicio =  document.getElementById('descripcionServicio'); 
    const costoServicio = document.getElementById('costo');
    const nivelServicio = document.querySelector('input[name="nivelServicio"]:checked');
    const contactoWhatsapp =    document.getElementById('whatsapp');
    const contactoInstagram = document.getElementById('instagram');
    const contactoFacebook = document.getElementById('facebook');
    const fotoServicio = document.getElementById('fotoServicio');

    if (!autorizado) {
        sinAutorizacionMsj('Usuario no esta autorizado');
    }

    const usuarioActual = await cargarUsuarioActual();
    const cargarServicio = await cargarCategoriaServicio();

    for (let i = 0; i < cargarServicio.length; i++) {
        const categoria = `
            <option value="${cargarServicio[i]._id}">
                ${cargarServicio[i].nombre}
            </option>s
        `;

        categoriaServicio.insertAdjacentHTML("beforeend", categoria);
    }

    if (usuarioActual?.estado !== 'activo') {
        sinAutorizacionMsj('Su solicitud aun esta pendiente');
    }
    
    registrarServicioBtn.addEventListener("click", async (e) => {
        try {
            let error = revisarForm();
            if (!error && categoriaServicio.value !== 'none') {
                const dias = [...document.querySelectorAll('.checkbox:checked')].map((e) => e.value);
                const horario = dias.map((dia) => document.getElementById(dia).value);
                const fotoServicioBase64 = await Promise.all([...fotoServicio.files].map(async (file) => await toBase64(file)));
                const proveedor = localStorage.getItem('correo');

                if (dias.length > 0 && horario.length > 0) {
                    await registrarServicio({
                        proveedor: proveedor,
                        //nombre_servicio: 'por definir',
                        // latitud_servicio: '',
                        //longitud_servicio: '',
                        nivel_servicio: nivelServicio.value,
                        descripcion: descripcionServicio.value,
                        costo: costoServicio.value,
                        dias_servicio: dias,
                        horario_servicio: horario,
                        imagenes_servicio: fotoServicioBase64,
                        whatsapp: contactoWhatsapp.value,
                        instagram: contactoInstagram.value,
                        facebook: contactoFacebook.value,
                        // categoria_servicio: categoriaServicio.value
                    });
                    
                    Swal.fire({
                        title: 'Success',
                        text: 'Registro éxitoso',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            window.location.href = `${location.origin}/Proveedor/landingPageProveedor/landing_page_proveedor.html`;
                        }
                    });
                    
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Horario no puede estar vacio',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Campos vacíos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
        } catch (e) {
            Swal.fire({
                title: 'Error!',
                text: e.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }, false);
    } catch (e) {
        Swal.fire({
            title: 'Error!',
            text: e.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});
