const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { authorization: localStorage.getItem('token') }
});

const listarVacunas = async (categoria) => {
    try {
        const { data } = await api.get(`vacunas/listar/${categoria}`);
        return data;
    } catch (e) {
        return e.message;
    }
}

const eliminarVacuna = async (id) => {
    try {
        const { data } = await api.delete(`vacunas/eliminar/${id}`);
        insertarAccion();
        return data;
    } catch (e) {
        return e.message;
    }
}

const insertarAccion = () => {
    let correo = localStorage.getItem('correo');
  
    let hoy = new Date();
    var infoAccion = {
      usuario: correo,
      accion: 'Eliminar vacuna',
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


const buscarVacuna = async (nombre) => {
    try {
        const { data } = await api.post('vacunas/buscar/', {
            nombre,
        });
        return data;
    } catch (e) {
        return e;
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
                <a><i class="fas fa-trash" id="eliminarVacuna" vacuna-id="${id}"></i></a>
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
                    ${ vacunas[i + 1] ? vacunaHtml(vacunas[i + 1].imagen, vacunas[i + 1].nombre, vacunas[i].categoria, vacunas[i + 1]._id) : '' }
                </div>
            `;

            document.getElementById('listadoVacunas').insertAdjacentHTML("beforeend", listado);
        }

        return true;
    } catch (e) {
        throw e.message;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Verificar si el current user esta autorizado
        const autorizado = verificarAcceso(['administrador']);
        const categoria = document.getElementById('tipoMascota');
        const categoriaDefault = document.getElementById('tipoMascota').value;
        const vacunasBuscar = document.getElementById('nombre');

        let timeout = null;

        if (!autorizado) {
            sinAutorizacionMsj('Usuario no esta autorizado');
        }

        await renderVacunas(categoriaDefault);
        
        document.addEventListener('click', async (e) => {
            if (e.target && e.target.id == 'eliminarVacuna') {
                const id = e.target.getAttribute('vacuna-id');
                
                
            
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "¡No podrá revertir esto!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire(
                            'Eliminado',
                            'La vacuna ha sido eliminada.',
                            'success'
                        )
                        await eliminarVacuna(id);
                        await renderVacunas(categoriaDefault);
            
                    }
                })


                
            }
         });

        categoria.addEventListener('change', async (e) => {
            try {
                await renderVacunas(e.target.value);   
            } catch (e) {
                throw e;
            }
        });

        vacunasBuscar.addEventListener('input', async (e) => {
            try {
                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = window.setTimeout(async () => {
                    if (e.target.value) {
                            const vacunas = await buscarVacuna(e.target.value);
                            document.getElementById('listadoVacunas').innerHTML = '';

                            for (let i = 0; i < vacunas.length; i += 2) {
                                const listado = `
                                <div class="listado">
                                    ${ vacunaHtml(vacunas[i].imagen, vacunas[i].nombre, vacunas[i].categoria, vacunas[i]._id)}
                                    ${ vacunas[i + 1] ? vacunaHtml(vacunas[i].imagen, vacunas[i].nombre, vacunas[i].categoria, vacunas[i]._id) : ''}
                                </div>
                            `;

                            document.getElementById('listadoVacunas').insertAdjacentHTML("beforeend", listado);
                        }
                    } else {
                        const categoriaDefault = document.getElementById('tipoMascota').value;
                        await renderVacunas(categoriaDefault);
                    }
                }, 1500);
            } catch (e) {
                throw e;
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
