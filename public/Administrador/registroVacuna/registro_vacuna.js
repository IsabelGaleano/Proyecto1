/*document.querySelector('#revisarVacuna').addEventListener('click', e => {
    let revisar = document.getElementById("revisarVacuna");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        insertarVacuna();

        revisar.setAttribute("href", "../listadoVacunas/listado_vacunas.html")
        

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});*/

const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { authorization: localStorage.getItem('token') }
});

const registrarVacuna = async (nombre, descripcion, imagen, categoria) => {
    try {
        const { data } = await api.post('vacunas/insertar', {
            nombre,
            descripcion,
            imagen,
            categoria
        });
        return data;
    } catch (e) {
        return e;
    }
}

const fotoPreview = async (e) => {
    try {
        const foto = e.target.files[0];

        if (foto) {
            const base64foto = await toBase64(foto);
            document.getElementById('fotoVacuna').src = base64foto;
        }
    } catch (e) {
        throw e;
    }
};


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const registrarVacunaBtn = document.getElementById('registrarVacuna');
        const fotoVacuna = document.getElementById('agregarFoto');
        // const agregarFotoBtn = document.getElementById('agregarFoto');

        fotoVacuna.addEventListener('change', fotoPreview);

        registrarVacunaBtn.addEventListener("click", async () => {
            try {
                const error = revisarForm();
                console.log({ error, tipoAnimal: tipoAnimal.value });
                if (!error && tipoAnimal.value !== 'none') {
                    const nombre = document.getElementById('nombreVacuna').value;
                    const descripcion = document.getElementById('descripcionVacuna').value;
                    const foto = document.getElementById('fotoVacuna').src;
                    const categoria = document.getElementById('tipoAnimal').value;

                    if (descripcion.length && nombre.length) {
                        const test = await registrarVacuna(nombre, descripcion, foto, categoria);
                        console.log(test);

                        Swal.fire({
                            title: 'Registro exitoso!',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(({ isConfirmed }) => {
                            if (isConfirmed) {
                                window.location.href = `${location.origin}/Administrador/listadoVacunas/listado_vacunas.html`;
                            }
                        });

                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Campos vacíos',
                            icon: 'error',
                            confirmButtonText: 'Aceptar'
                        })

                    }

                }

            } catch (error) {

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