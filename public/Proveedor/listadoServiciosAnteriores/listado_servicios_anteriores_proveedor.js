
const cargarListadoUsuario = () => {
    let proveedor = localStorage.getItem('correo');
    var datos = {
        tipo: "proveedor",
        proveedor: proveedor,
        estado: "finalizado"
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
            
                let listado;
                for (let i = 0; i < json.length; i += 2) {

                    if (json[i + 1] !== undefined) {
                        let hours = new Date(fechas[i]).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;


                        let hours2 = new Date(fechas[i + 1]).getHours();
                        let finalHour2 = hours2 >= 13 ? hours2 - 12 : hours2;

                        let finalHourFormatted2 = finalHour2 <= 9 ? '0' + finalHour2 : finalHour2;


                        
                        listado = `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagen_usuario}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[i]).getMinutes()} ${(new Date(fechas[i]).getHours() >= 12 && new Date(fechas[i]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar"
                                    href="../vistaServicioFinalizadoProveedor/vista_servicio_finalizado_proveedor.html" data-correo-servicio-fin = "${json[i].correo}"  data-fecha-servicioFin = "${fechas[i]}" onclick="ver(this)">
                                    Ver</a>
                            </div>
            
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i + 1].imagen_usuario}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i + 1].nombre} ${json[i + 1].apellido1} ${json[i + 1].apellido2}</h4>
                                <p>${new Date(fechas[i + 1]).getUTCFullYear()}-${new Date(fechas[i + 1]).getUTCMonth() + 1}-${new Date(fechas[i + 1]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted2}:${new Date(fechas[i + 1]).getMinutes()} ${(new Date(fechas[i + 1]).getHours() >= 12 && new Date(fechas[i + 1]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar"
                                    href="../vistaServicioFinalizadoProveedor/vista_servicio_finalizado_proveedor.html" data-correo-servicio-fin = "${json[i + 1].correo}" data-fecha-servicioFin = "${fechas[i + 1]}" onclick="ver(this)">Ver</a>
                            </div>
                        </div>
                    </div>`;

                    } else {
                        let hours = new Date(fechas[i]).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;
               
                        listado = `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagen_usuario}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[i]).getMinutes()} ${(new Date(fechas[i]).getHours() >= 12 && new Date(fechas[i]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar"
                                    href="../vistaServicioFinalizadoProveedor/vista_servicio_finalizado_proveedor.html" data-correo-servicio-fin = "${json[i].correo}" data-fecha-servicioFin = "${fechas[i]}" onclick="ver(this)">
                                    Ver</a>
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
    const correo = element.getAttribute('data-correo-servicio-fin');
    let fecha = element.getAttribute('data-fecha-servicioFin ');
    let infoFinalizado = {
        correo: correo,
        fecha: fecha
    }
    let jsonInfo = JSON.stringify(infoFinalizado);
    localStorage.setItem('data-fin', jsonInfo);

}


const api = axios.create({
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

                const fechas = clientes.map(({ fechaFin }) => fechaFin);
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
});