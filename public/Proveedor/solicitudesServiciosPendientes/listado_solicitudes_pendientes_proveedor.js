const cargarListadoUsuario = () => {
    let proveedor = localStorage.getItem('correo');
    var datos = {
        tipo: "proveedor",
        proveedor: proveedor,
        estado: "pendiente"
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
                                <a href="../perfilClienteProveedor/perfil_cliente_proveedor.html" data-correo = "${json[i].correo}" onclick="ver(this)"> <img src="../../img/man1.jpg" /></a>
                               
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1}</h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[i]).getMinutes()} ${(new Date(fechas[i]).getHours() >= 12 && new Date(fechas[i]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="#" onclick="enviar('${json[i].correo}')"> Aceptar</a>
                            </div>
                          
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <a href="../perfilClienteProveedor/perfil_cliente_proveedor.html" data-correo = "${json[i + 1].correo}" onclick="ver(this)"> <img src="../../img/man1.jpg" /></a>
                               
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i + 1].nombre} ${json[i + 1].apellido1}</h4>
                                <p>${new Date(fechas[i + 1]).getUTCFullYear()}-${new Date(fechas[i + 1]).getUTCMonth() + 1}-${new Date(fechas[i + 1]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted2}:${new Date(fechas[i + 1]).getMinutes()} ${(new Date(fechas[i + 1]).getHours() >= 12 && new Date(fechas[i + 1]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="#" onclick="enviar('${json[i+1].correo}')"> Aceptar</a>
                            </div>
                    </div>`;

                    } else {
                        let hours = new Date(fechas[i]).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;

                        listado = `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <a href="../perfilClienteProveedor/perfil_cliente_proveedor.html" data-correo = "${json[i].correo}" onclick="ver(this)"> <img src="../../img/man1.jpg" /></a>
                               
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1}</h4>
                                    <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                    <p class="margin-top">${finalHourFormatted}:${new Date(fechas[i]).getMinutes()} ${(new Date(fechas[i]).getHours() >= 12 && new Date(fechas[i]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                                </div>
                                <div class="button-ver">
                                    <a class="button button-aceptar" href="#" onclick="enviar('${json[i].correo}')"> Aceptar</a>
                                </div>
        
                        </div>
                    </div>`


                    }


                    document.getElementById('listado').insertAdjacentHTML("beforeend", listado);
                }
            }
        )

}


const enviar = cliente => {
    pagosPendientes(cliente);
    notificaciones(cliente);
    Swal.fire({
        title: 'Success',
        text: 'Servicio contratado',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}



const pagosPendientes = cliente => {
    let proveedor = localStorage.getItem('correo');
    var datos = {
        proveedor: proveedor,
        cliente: cliente,
        estado: "pago_pendiente",
       
    }
  
    fetch("http://localhost:5000/solicitudes/actualizar_solicitudes", {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            response.json({ message: err })
        });
  
  }
  

const notificaciones = cliente => {

    let proveedor = localStorage.getItem('correo');
    var datos = {
        receptor: cliente,
        descripcion: "Aceptó su solicitud de servicio, tiene un pago pendiente",
        fecha: new Date(),
        emisor: proveedor,
       
    }
  
    fetch("http://localhost:5000/notificaciones/insertar", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            response.json({ message: err })
        });
  
  }

const ver = (element) => {
    const correo = element.getAttribute('data-correo');
    localStorage.setItem('data-correo', correo);
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
});