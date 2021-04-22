const listarVacunas = async (categoria) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/vacunas/listar/${categoria}`);
        return data;
    } catch (e) {
        return e.message;
    }
}

const vacunaHtml = (imagen, nombre, categoria, id) => {
    return `
        <div class="info-listado">
            <div class="img-categoria">
                <img src="${imagen || '../../img/vacuna_rabia.png'}" />
            </div>
            <div class="descripcion-info">
                <h4 class="titulo-categoria">${nombre}</h4>
                <p>Tipo: ${categoria}</p>
            </div>
            <div class="button-accion">
                <a href="../actualizarVacuna/actualizar_vacuna.html?id=${id}">
                    <i class="fas fa-edit"></i>
                </a>
            </div>
            <div class="button-accion">
                <a href="#"><i class="fas fa-trash"></i></a>
            </div>
        </div>
    `;
}

const renderVacunas = async (categoria) => {
    try {
        const vacunas = await listarVacunas(categoria);

        document.getElementById('listadoVacunas').innerHTML = '';

        for (let i = 0; i < vacunas.length; i += 2) {
            const listado = `
                <div class="listado">
                    ${ vacunaHtml(vacunas[i].imagen, vacunas[i].nombre, vacunas[i].categoria, vacunas[i]._id) }
                    ${ vacunas[i + 1] ? vacunaHtml(vacunas[i].imagen, vacunas[i].nombre, vacunas[i].categoria, vacunas[i]._id) : '' }
                </div>
            `;

            document.getElementById('listadoVacunas').insertAdjacentHTML("beforeend", listado);
        }

        return true;
    } catch (e) {
        return e.message;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Verificar si el current user esta autorizado
        const autorizado = verificarAcceso(['administrador']);
        const categoria = document.getElementById('tipoMascota');
        const categoriaDefault = document.getElementById('tipoMascota').value;

        if (!autorizado) {
            sinAutorizacionMsj('Usuario no esta autorizado');
        }

        await renderVacunas(categoriaDefault);

        categoria.addEventListener('change', async (e) => {
            await renderVacunas(e.target.value);
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


