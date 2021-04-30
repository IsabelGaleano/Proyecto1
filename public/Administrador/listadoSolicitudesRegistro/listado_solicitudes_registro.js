const cargarListadoRegistro = () => {
    let tipoUsuario = "proveedor"
    let estadoUsuario = "pendiente"
    var datos = {
        tipo_usuario: tipoUsuario,
        estado: estadoUsuario
    }

    fetch("http://localhost:5000/usuarios/buscar_tipo_usuario_registro", {
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
                let contListado = "";
                for (let i = 0; i < json.length; i+=2) {

                    if (json[i+1] !== undefined) {
                        let hours = new Date(json[i].fecha_registro).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;
                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;
                        let hours2 = new Date(json[i + 1].fecha_registro).getHours();
                        let finalHour2 = hours2 >= 13 ? hours2 - 12 : hours2;
                        let finalHourFormatted2 = finalHour2 <= 9 ? '0' + finalHour2 : finalHour2;

                        contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-user">
                                <img src="${json[i].imagen_usuario}"/>
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h4>
                                <p class="margin-top">${new Date(json[i].fecha_registro).getUTCFullYear()}-${new Date(json[i].fecha_registro).getUTCMonth() + 1}-${new Date(json[i].fecha_registro).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(json[i].fecha_registro).getMinutes()} ${(new Date(json[i].fecha_registro).getHours() >= 12 && new Date(json[i].fecha_registro).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a href="../vistaRegistroProveedor/vista_registro_proveedor.html" class="button button-aceptar"  providerEmailInfo = "${json[i].correo}" onclick="lookUpProviderInfo(this)">Continuar</a>
                            </div>
                            <div class="button-ver">
                                <button type="button" class=" button button-cancelar" providerEmail = "${json[i].correo}" onclick="eliminar('${json[i].correo}')">Rechazar</button>
                            </div>
                        </div>
                        <div class="info-listado">
                            <div class="img-user">
                                <img src="${json[i+1].imagen_usuario}"/>
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i+1].nombre} ${json[i+1].apellido1} ${json[i+1].apellido2}</h4>
                                <p class="margin-top">${new Date(json[i + 1].fecha_registro).getUTCFullYear()}-${new Date(json[i + 1].fecha_registro).getUTCMonth() + 1}-${new Date(json[i + 1].fecha_registro).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(json[i + 1].fecha_registro).getMinutes()} ${(new Date(json[i + 1].fecha_registro).getHours() >= 12 && new Date(json[i + 1].fecha_registro).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a href="../vistaRegistroProveedor/vista_registro_proveedor.html" class="button button-aceptar"  providerEmailInfo = "${json[i+1].correo}" onclick="lookUpProviderInfo(this)">Continuar</a>
                            </div>
                            <div class="button-ver">
                                <button type="button" class=" button button-cancelar" providerEmail = "${json[i+1].correo}" onclick="eliminar('${json[i + 1].correo}')">Rechazar</button>
                            </div>
                        </div>
                    </div>`;
                      

                    } else {
                        let hours = new Date(json[i].fecha_registro).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;

                        contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-user">
                                <img src="${json[i].imagen_usuario}"/>
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h4>
                                <p class="margin-top">${new Date(json[i].fecha_registro).getUTCFullYear()}-${new Date(json[i].fecha_registro).getUTCMonth() + 1}-${new Date(json[i].fecha_registro).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(json[i].fecha_registro).getMinutes()} ${(new Date(json[i].fecha_registro).getHours() >= 12 && new Date(json[i].fecha_registro).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button-ver">
                                <a href="../vistaRegistroProveedor/vista_registro_proveedor.html" class="button button-aceptar" providerEmailInfo = "${json[i].correo}" onclick="lookUpProviderInfo(this)">Continuar</a>
                            </div>
                            <div class="button-ver">
                                <button type="button" class=" button button-cancelar" providerEmail = "${json[i].correo}" onclick="eliminar('${json[i].correo}')">Rechazar</button>
                            </div>
                        </div>
                    </div>`
                    }
                    document.getElementById('listado').innerHTML = contListado;
                }
            }
        )
}

const lookUpProviderInfo = (element) => {
    const correo = element.getAttribute('providerEmailInfo');
    localStorage.setItem('providerEmailInfo', correo);
}

const buscar = () => {
    let busqueda = document.getElementById('buscar').value;
    let letrasBusqueda = busqueda.split('');
    let listado = document.getElementById('listado');
    let tipoUsuario = "proveedor"
    let estadoUsuario = "pendiente"
    var datos = {
        tipo_usuario: tipoUsuario,
        estado: estadoUsuario
    }

    fetch("http://localhost:5000/usuarios/buscar_tipo_usuario_registro", {
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
                let contListado = "";
                let i;
                var esBuscado = false;
                let nombres = [];
                let apellidos1 = [];
                let apellidos2 = [];
                let imagenes = [];
                let correos = [];
                let fechas = [];
                let checkNoBuscado = false;
                
                if (busqueda == "") {
                    cargarListadoRegistro()
                } else {
                    for (i = 0; i < json.length; i++) {
                            let letrasNombre = json[i].nombre.split('');
                            checkNoBuscado = false;

                            for (let j = 0; j < busqueda.length; j++) {
                                if (!checkNoBuscado) {
                                    if (letrasNombre[j] == letrasBusqueda[j]) {
                                        esBuscado = true;
                                    } else {
                                        esBuscado = false;
                                        checkNoBuscado = true;
                                    }
                                }
                            }
                            
                        if (esBuscado) {
                            nombres.push(json[i].nombre);
                            imagenes.push(json[i].imagen_usuario);
                            apellidos1.push(json[i].apellido1);
                            apellidos2.push(json[i].apellido2);
                            correos.push(json[i].correo);
                            fechas.push(json[i].fecha_registro)
                        } else {
                            listado.innerHTML = "";
                        }
                    }

                    for (let l = 0; l < nombres.length; l+=2) {
                        if (nombres[l+1] != undefined) {
                            let hours = new Date(fechas[l]).getHours();
                            let finalHour = hours >= 13 ? hours - 12 : hours;
                            let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;
                            let hours2 = new Date(fechas[l + 1]).getHours();
                            let finalHour2 = hours2 >= 13 ? hours2 - 12 : hours2;
                            let finalHourFormatted2 = finalHour2 <= 9 ? '0' + finalHour2 : finalHour2;

                            contListado += `<div class="listado">
                            <div class="info-listado">
                                <div class="img-user">
                                    <img src="${imagenes[l]}"/>
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="margin-bottom">${nombres[l]} ${apellidos1[l]} ${apellidos2[l]}</h4>
                                    <p class="margin-top">${new Date(fechas[l]).getUTCFullYear()}-${new Date(fechas[l]).getUTCMonth() + 1}-${new Date(fechas[l]).getUTCDate()}</p>
                                    <p class="margin-top">${finalHourFormatted}:${new Date(fechas[l]).getMinutes()} ${(new Date(fechas[l]).getHours() >= 12 && new Date(fechas[l]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                                </div>
                                <div class="button-ver">
                                    <a href="../vistaRegistroProveedor/vista_registro_proveedor.html" class="button button-aceptar"  providerEmailInfo = "${correos[l]}" onclick="lookUpProviderInfo(this)">Continuar</a>
                                </div>
                                <div class="button-ver">
                                    <button type="button" class=" button button-cancelar" providerEmail = "${correos[l]}" onclick="deleteProvider(this)">Rechazar</button>
                                </div>
                            </div>
                            <div class="info-listado">
                                <div class="img-user">
                                    <img src="${imagenes[l+1]}"/>
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="margin-bottom">${nombres[l+1]} ${apellidos1[l+1]} ${apellidos2[l+1]}</h4>
                                    <p class="margin-top">${new Date(fechas[l + 1]).getUTCFullYear()}-${new Date(fechas[l + 1]).getUTCMonth() + 1}-${new Date(fechas[l + 1]).getUTCDate()}</p>
                                    <p class="margin-top">${finalHourFormatted}:${new Date(fechas[l + 1]).getMinutes()} ${(new Date(fechas[l + 1]).getHours() >= 12 && new Date(fechas[l + 1]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                                </div>
                                <div class="button-ver">
                                    <a href="../vistaRegistroProveedor/vista_registro_proveedor.html" class="button button-aceptar"  providerEmailInfo = "${correos[l+1]}" onclick="lookUpProviderInfo(this)">Continuar</a>
                                </div>
                                <div class="button-ver">
                                    <button type="button" class=" button button-cancelar" providerEmail = "${correos[l+1]}" onclick="deleteProvider(this)">Rechazar</button>
                                </div>
                            </div>
                        </div>`;
                        } else {
                            let hours = new Date(fechas[l]).getHours();
                            let finalHour = hours >= 13 ? hours - 12 : hours;
    
                            let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;
                            contListado += `<div class="listado">
                            <div class="info-listado">
                                <div class="img-user">
                                    <img src="${imagenes[l]}"/>
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="margin-bottom">${nombres[l]} ${apellidos1[l]} ${apellidos2[l]}</h4>
                                    <p class="margin-top">${new Date(fechas[l]).getUTCFullYear()}-${new Date(fechas[l]).getUTCMonth() + 1}-${new Date(fechas[l]).getUTCDate()}</p>
                                    <p class="margin-top">${finalHourFormatted}:${new Date(fechas[l]).getMinutes()} ${(new Date(fechas[l]).getHours() >= 12 && new Date(fechas[l]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                                </div>
                                <div class="button-ver">
                                    <a href="../vistaRegistroProveedor/vista_registro_proveedor.html" class="button button-aceptar" providerEmailInfo = "${correos}" onclick="lookUpProviderInfo(this)">Continuar</a>
                                </div>
                                <div class="button-ver">
                                    <button type="button" class=" button button-cancelar" providerEmail = "${correos[l]}" onclick="deleteProvider(this)">Rechazar</button>
                                </div>
                            </div>
                        </div>`;
                        }
                    }
                    
                    listado.innerHTML = contListado;
                }
            }
        )
}


const eliminar = (correo) => {
    Swal.fire({
        title: 'Está seguro?',
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
            'El usuario ha sido eliminado.',
            'success'
          )
          deleteProvider(correo);
          enviarEmailRechazo(correo);
          insertarAccion();
        }
      })
}




const insertarAccion = () => {
    let correo = localStorage.getItem('correo');
  
    let hoy = new Date();
    var infoAccion = {
      usuario: correo,
      accion: 'Rechazar proveedor',
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

const deleteProvider = (correo) => {
    var datos = {
        correo: correo
    }
    fetch("http://localhost:5000/usuarios/eliminar", {
    method: 'DELETE',
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


const enviarEmailRechazo = correo => {
    let datos = {
        correo: correo,
    }
    fetch("http://localhost:5000/usuarios/send_email_rechazo", {
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
