
const cargarListadoUsuario = () => {
    let cliente = localStorage.getItem('correo');
    var datos = {
        tipo: "cliente",
        cliente: cliente,
        estado: "pago_pendiente"
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
                for (let i = 0; i < json.length; i++) {

                    correo[i] = json[i].proveedor;
                    fechas[i] = json[i].fecha;
                }
                cargarListado(correo, fechas);

            }
        )
}



const cargarListado = (correo, fechas) => {

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
                console.log(json)
                for (let i = 0; i < json.length; i += 2) {


                    if (json[i + 1] !== undefined) {
                        let hours = new Date(fechas[i]).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;


                        let hours2 = new Date(fechas[i + 1]).getHours();
                        let finalHour2 = hours2 >= 13 ? hours2 - 12 : hours2;

                        let finalHourFormatted2 = finalHour2 <= 9 ? '0' + finalHour2 : finalHour2;


                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagenes_servicio[0]}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[i]).getMinutes()} ${(new Date(fechas[i]).getHours() >= 12 && new Date(fechas[i]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../formaPago/forma_pago.html" data-correo-pago = "${json[i].proveedor}" onclick="ver(this)"> Pagar</a>
                            </div>
        
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i + 1].imagenes_servicio[0]}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i + 1].nombre_servicio}</h4>
                                <p>${new Date(fechas[i + 1]).getUTCFullYear()}-${new Date(fechas[i + 1]).getUTCMonth() + 1}-${new Date(fechas[i + 1]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted2}:${new Date(fechas[i + 1]).getMinutes()} ${(new Date(fechas[i + 1]).getHours() >= 12 && new Date(fechas[i + 1]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../formaPago/forma_pago.html" data-correo-pago = "${json[i].proveedor}" onclick="ver(this)"> Pagar</a>
                            </div>
                        </div>
                    </div>`;

                    } else {
                        let hours = new Date(fechas[i]).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;

                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagenes_servicio[0]}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[i]).getMinutes()} ${(new Date(fechas[i]).getHours() >= 12 && new Date(fechas[i]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../formaPago/forma_pago.html" data-correo-pago = "${json[i].proveedor}" onclick="ver(this)"> Pagar</a>
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
    const correo = element.getAttribute('data-correo-pago');
    console.log(correo);
    localStorage.setItem('data-correo-pago', correo);
}

const servicioHTML = (json) => {
    let listado;
    for (let i = 0; i < json.length; i += 2) {
        if (json[i + 1] !== undefined) {
            let hours = new Date(json[i].fecha).getHours();
            let finalHour = hours >= 13 ? hours - 12 : hours;

            let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;


            let hours2 = new Date(json[i].fecha).getHours();
            let finalHour2 = hours2 >= 13 ? hours2 - 12 : hours2;

            let finalHourFormatted2 = finalHour2 <= 9 ? '0' + finalHour2 : finalHour2;


            listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagenes_servicio[0]}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                                <p>${new Date(json[i].fecha).getUTCFullYear()}-${new Date(json[i].fecha).getUTCMonth() + 1}-${new Date(json[i].fecha).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(json[i].fecha).getMinutes()} ${(new Date(json[i].fecha).getHours() >= 12 && new Date(json[i].fecha).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../formaPago/forma_pago.html" data-correo-pago = "${json[i].proveedor}" onclick="ver(this)"> Pagar</a>
                            </div>
        
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i + 1].imagenes_servicio[0]}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i + 1].nombre_servicio}</h4>
                                <p>${new Date(json[i + 1].fecha).getUTCFullYear()}-${new Date(json[i + 1].fecha).getUTCMonth() + 1}-${new Date(json[i + 1].fecha).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted2}:${new Date(json[i + 1].fecha).getMinutes()} ${(new Date(json[i + 1].fecha).getHours() >= 12 && new Date(json[i + 1].fecha).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../formaPago/forma_pago.html" data-correo-pago = "${json[i].proveedor}" onclick="ver(this)"> Pagar</a>
                            </div>
                        </div>
                    </div>`;

        } else {
            let hours = new Date(json[i].fecha).getHours();
            let finalHour = hours >= 13 ? hours - 12 : hours;

            let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;

            listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagenes_servicio[0]}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                                <p>${new Date(json[i].fecha).getUTCFullYear()}-${new Date(json[i].fecha).getUTCMonth() + 1}-${new Date(json[i].fecha).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(json[i].fecha).getMinutes()} ${(new Date(json[i].fecha).getHours() >= 12 && new Date(json[i].fecha).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../formaPago/forma_pago.html" data-correo-pago = "${json[i].proveedor}" onclick="ver(this)"> Pagar</a>
                            </div>
                        </div>
                    </div>`


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
            estado: 'pago_pendiente',
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

        cargarListadoUsuario();

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
