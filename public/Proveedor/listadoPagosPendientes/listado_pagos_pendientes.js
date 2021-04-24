
const cargarListadoUsuario = () => {
    let proveedor = localStorage.getItem('correo');
    var datos = {
        tipo: "proveedor",
        proveedor: proveedor,
        estado: "pago_pendiente"
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
                
                        
                        listado = `<div class="listado-general">
                        <div class="listado">
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${json[i].imagen_usuario} />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h4>
                                    <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                </div>
                                <div class="button-ver">
                                    <a class="button button-aceptar" href="../perfilClienteProveedor/perfil_cliente_proveedor.html" data-correo = "${json[i].correo}" onclick="ver(this)"> Ver</a>
                                </div>
            
                            </div>
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${json[i + 1].imagen_usuario}" />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="margin-bottom">${json[i + 1].nombre} ${json[i + 1].apellido1} ${json[i + 1].apellido2}</h4>
                                    <p>${new Date(fechas[i + 1]).getUTCFullYear()}-${new Date(fechas[i + 1]).getUTCMonth() + 1}-${new Date(fechas[i + 1]).getUTCDate()}</p>
                                </div>
                                <div class="button-ver">
                                    <a class="button button-aceptar" href="../perfilClienteProveedor/perfil_cliente_proveedor.html" data-correo = "${json[i + 1].correo}" onclick="ver(this)"> Ver</a>
                                </div>
                            </div>
                        </div>`;

                    } else {
               
                        listado = `<div class="listado-general">
                        <div class="listado">
                            <div class="info-listado">
                                <div class="${json[i + 1].imagen_usuario}">
                                    <img src="../../img/man9.jpg" />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h4>
                                    <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                </div>
                                <div class="button-ver">
                                    <a class="button button-aceptar" href="../perfilClienteProveedor/perfil_cliente_proveedor.html" data-correo = "${json[i].correo}" onclick="ver(this)"> Ver</a>
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
    const correo = element.getAttribute('data-correo');
    console.log(correo);
    localStorage.setItem('data-correo', correo);


}