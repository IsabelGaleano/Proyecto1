
const cargarListadoUsuario = () => {
    let cliente = localStorage.getItem('correo');
    console.log(cliente);
    var datos = {
        tipo: "cliente",
        cliente: cliente,
        estado: "pendiente"
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
                console.log(json);
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
                for (let i = 0; i < json.length; i += 2) {

                    if (json[i + 1] !== undefined) {

                        listado = `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../img/estetica4.PNG" />
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
                                <a class="button button-aceptar" href="../perfilProveedorCliente/perfil_proveedor_cliente.html">
                                    Ver más</a>
                            </div>
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../img/estetica5.jpg" />
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
                                <a class="button button-aceptar" href="../perfilProveedorCliente/perfil_proveedor_cliente.html"> Ver
                                    más</a>
                            </div>
                        </div>
                    </div>`;

                    } else {

                        listado = `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../img/estetica4.PNG" />
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
                                <a class="button button-aceptar" href="../perfilProveedorCliente/perfil_proveedor_cliente.html">
                                    Ver más</a>
                            </div>
                        </div>         
                    </div>`


                    }


                    document.getElementById('listado').insertAdjacentHTML("beforeend", listado);

                }
            }
        )

}
