const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { authorization: localStorage.getItem('token') }
});

const cargarVacuna = async (idVacuna) => {
    try {
        const { data } = await api.get(`/vacunas/buscar/${idVacuna}`);
        return data;
    } catch (e) {
        throw e;
    }
};

const actualizarVacuna = async (vacuna) => {
    try {
        const { data } = await api.put('/vacunas/actualizar', { ...vacuna });
        return data;
    } catch (e) {
        throw e;
    }
};

const setDefaults = (vacuna) => {
    document.getElementById('nombre').value = vacuna.nombre;
    document.getElementById('descripcion').value = vacuna.descripcion;
    document.getElementById(vacuna.categoria).checked = true;
    document.getElementById('imgVacuna').src = vacuna?.imagen ? vacuna.imagen : '../../img/agregarImg.jpg';
};

const imgPreview = async (e) => {
    try {
        const img = e.target.files[0];

        if (img) {
            const base64Img = await toBase64(img);
            document.getElementById('imgVacuna').src = base64Img;
        }
    } catch (e) {
        throw e;
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Verificar si el current user esta autorizado
        const autorizado = verificarAcceso(['administrador']);
        const actualizarVacunaBtn = document.getElementById('actualizarVacuna');
        const imagenInput = document.getElementById('imagenInput');
        const urlParams = new URLSearchParams(window.location.search);
        const idVacuna = urlParams.get('id');

        if (!autorizado) {
            sinAutorizacionMsj('Usuario no esta autorizado');
        }

        const vacuna = await cargarVacuna(idVacuna);

        setDefaults(vacuna);

        imagenInput.addEventListener('change', imgPreview);
        
        actualizarVacunaBtn.addEventListener('click', async () => {
            const error = revisarForm();
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const categoria = document.querySelector('input[name="categoriaAnimal"]:checked').value;
            const imagen = document.getElementById('imgVacuna').src;

            if (!error) {
                const vacunaActualizada = await actualizarVacuna({
                    nombre, 
                    descripcion, 
                    categoria, 
                    imagen,
                    _id: vacuna._id
                });

                setDefaults(vacunaActualizada);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Campos vacíos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })
        
            } 
        });
    } catch (e) {
        Swal.fire({
            title: 'Error!',
            text: e.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
  });