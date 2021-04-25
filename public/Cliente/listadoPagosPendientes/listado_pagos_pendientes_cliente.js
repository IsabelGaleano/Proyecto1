
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
                console.log(json)
                let listado;
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
                                <img src="../img/estetica4.PNG" />
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
                                <img src="../img/estetica5.jpg" />
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
                                <img src="../img/estetica4.PNG" />
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