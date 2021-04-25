const servicioHTML = (json) => {
    let listado;
    for (let i = 0; i < json.length; i += 2) {

        if (json[i + 1] !== undefined) {

            listado = ` 
                <div class="listado">
                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="../img/estetica6.jpg" />
                        </div>
                    
                        <div class="descripcion-info">
                            <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                            <div class="estrellas">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>

                        <div class="button-ver">
                            <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i].proveedor}" onclick="ver(this)"> Ver más</a>
                        </div> 
                    </div>

                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="../img/estetica7.jpg" />
                        </div>
                        
                        <div class="descripcion-info">
                            <h4 class="margin-bottom">${json[i + 1].nombre_servicio}</h4>
                            <div class="estrellas">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <div class="button-ver">
                            <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i + 1].proveedor}" onclick="ver(this)"> Ver más</a>
                        </div>
                    </div>
                </div> `;
            } else {
                listado = ` 
                    <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../img/estetica6.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                                <div class="estrellas">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i].proveedor}" onclick="ver(this)"> Ver
                                    más</a>
                            </div>
                        </div>
                    </div>
                `;
            }

        document.getElementById('listado').insertAdjacentHTML("beforeend", listado);
    }
}

const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { authorization: localStorage.getItem('token') }
});

const buscarClientes = async (criterioBusqueda) => {
    try {
        const { data } = await api.post('solicitudes/cliente/buscar', {
            cliente: localStorage.getItem('correo'),
            tipo: 'cliente',
            estado: 'finalizado',
            criterioBusqueda
        });

        return data;
    } catch (e) {
        throw e;
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const autorizado = verificarAcceso(['cliente']);
        const buscar = document.getElementById('inputBuscar');

        let timeout = null;

        if (!autorizado) {
            sinAutorizacionMsj('Usuario no esta autorizado');
        }

        buscar.addEventListener('input', async (e) => {
            const busqueda = e.target.value;

            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = window.setTimeout(async () => {
                const listadoContainer = document.getElementById('listado');
                const servicios = await buscarClientes(busqueda);
                listadoContainer.innerHTML = '';

                servicioHTML(servicios)
            }, 1500);
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
