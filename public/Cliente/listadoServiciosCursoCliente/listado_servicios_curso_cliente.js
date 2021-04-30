
const cargarListadoUsuario = () => {
    let cliente = localStorage.getItem('correo');
    var datos = {
        tipo: "cliente",
        cliente: cliente,
        estado: "curso"
    }

    fetch("http://localhost:5000/solicitudes/buscar_solicitudes_pendientes_cliente", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                let correo = [];
                let fechas = [];
                let fechasInicio = [];
                let fechasFin = [];
                for (let i = 0; i < json.length; i++) {

                    correo[i] = json[i].proveedor;
                    fechas[i] = json[i].fecha;
                    fechasInicio = json[i].fechaInicio;
                    fechasFin = json[i].fechaFin;
                    
                }
                cargarListado(correo, fechas, fechasInicio, fechasFin);
            }
        )
}


const cargarListado = (correo, fechas, fechasInicio, fechasFin) => {
    let datos = {
        proveedor: correo
    }

    fetch("http://localhost:5000/servicios/buscar_servicio_solicitudes",
        {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(
            response => {

                return response.json();

            }

        )
        .then(
            json => {
                let listado;
                for (let i = 0; i < json.length; i += 2) {

                    if (json[i + 1] !== undefined) {

                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagenes_servicio[0]}" />
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
                                <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-cursoServicio = "${json[i].proveedor}"  data-fechaCurso = "${fechas[i]}" onclick="ver(this)"> Ver
                                    más</a>
                            </div>
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i + 1].imagenes_servicio[0]}" />
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
                                <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-cursoServicio = "${json[i + 1].proveedor}"  data-fechaCurso = "${fechas[i + 1]}" onclick="ver(this)"> Ver
                                    más</a>
                            </div>
                        </div>
                    </div> `;

                    } else {

                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagenes_servicio[0]}" />
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
                                <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-cursoServicio = "${json[i].proveedor}" data-fechaCurso = "${fechas[i]}" onclick="ver(this)"> Ver
                                    más</a>
                            </div>
                        </div>
                        
                    </div>`
                    }

                    document.getElementById('listado').insertAdjacentHTML("beforeend", listado);

                }
            }
        )

}

const ver = (element) => {
    const correo = element.getAttribute('data-cursoServicio');
    let fechas = document.getElementById('data-fechaCurso')
    let infoCurso = {
        correo: correo,
        fecha: fechas
    }
    console.log(infoCurso);
    let jsonInfo = JSON.stringify(infoCurso);
    localStorage.setItem('data-cursoServicio', jsonInfo);
}

const servicioHTML = (json) => {
    let listado;
    for (let i = 0; i < json.length; i += 2) {

        if (json[i + 1] !== undefined) {

            listado = ` 
                <div class="listado">
                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="${json[i].imagenes_servicio[0]}" />
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
                            <img src="${json[i + 1].imagenes_servicio[0]}" />
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
                                <img src="${json[i].imagenes_servicio[0]}" />
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
            tipo: 'cliente',
            estado: 'curso',
            cliente: localStorage.getItem('correo'),
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

        cargarListadoUsuario();

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
                const clientes = await buscarClientes(busqueda);

                listadoContainer.innerHTML = '';

                servicioHTML(clientes);
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