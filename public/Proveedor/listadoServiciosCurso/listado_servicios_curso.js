const cargarListadoUsuario = () => {
    let proveedor = localStorage.getItem('correo');
    var datos = {
        tipo: "proveedor",
        proveedor: proveedor,
        estado: "curso"
    }

    fetch("http://localhost:5000/solicitudes/buscar_solicitudes_pendientes_proveedor", {
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
                console.log(json)
                let correo = [];
                let fechas = [];
                for (let i = 0; i < json.length; i++) {

                    correo[i] = json[i].cliente;
                    fechas[i] = json[i].fecha;
                }
                cargarListado(correo, fechas);
         
            }
        )
}


const cargarListado = (correo, fechas) => {

    let datos = {
        correo: correo
    }

    fetch("http://localhost:5000/usuarios/buscar_usuarios_solicitudes",
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
                console.log(json)
                let listado;
                for (let i = 0; i < json.length; i += 2) {
                    if (json[i + 1] !== undefined) {
            
                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../../img/man4.jfif" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2} </h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoProveedor/vista_servicio_curso_proveedor.html" data-cliente-curso = "${json[i].correo}" data-fecha = "${fechas[i]}" onclick="ver(this)"> Ver</a>
                            </div>
        
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../../img/mujer4.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i + 1].nombre} ${json[i + 1].apellido1} ${json[i + 1].apellido2} </h4>
                                <p>${new Date(fechas[i + 1]).getUTCFullYear()}-${new Date(fechas[i + 1]).getUTCMonth() + 1}-${new Date(fechas[i + 1]).getUTCDate()}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoProveedor/vista_servicio_curso_proveedor.html" data-cliente-curso = "${json[i + 1].correo}" data-fecha = "${fechas[i + 1]}" onclick="ver(this)"> Ver</a>
                            </div>
                        </div>
                    </div>`;

                    } else {

                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../../img/man4.jfif" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2} </h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoProveedor/vista_servicio_curso_proveedor.html" data-cliente-curso = "${json[i].correo}" data-fecha = "${fechas[i]}" onclick="ver(this)"> Ver</a>
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
    let correo = element.getAttribute('data-cliente-curso');
    let fecha = element.getAttribute('data-fecha');
    console.log(fecha)
    let infoCurso = {
        correo,
        fecha
    }
    let jsonInfo = JSON.stringify(infoCurso);
    localStorage.setItem('data-cliente-curso', jsonInfo);

}

/*const api = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { authorization: localStorage.getItem('token') }
});

const buscarClientes = async (cliente) => {
    try {
        const { data } = await api.post('solicitudes/buscar', {
            cliente,
            tipo: 'cliente',
            estado: 'finalizado',
            proveedor: localStorage.getItem('correo')
        });

        return data;
    } catch (e) {
        throw e;
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const autorizado = verificarAcceso(['proveedor']);
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

                const fechas = clientes.map(({ fecha }) => fecha);
                const correos = clientes.map(({ cliente }) => cliente);

                listadoContainer.innerHTML = '';

                cargarListado(correos, fechas);
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
});*/
