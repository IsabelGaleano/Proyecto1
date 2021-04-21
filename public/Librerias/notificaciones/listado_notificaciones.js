//Cargar todas las solicitudes de los usuarios
//Las notificaciones a la hora dde listarlas, para buscarlas lo que importa es quien la recibe, luego se listan los que las envian
let correo = [];
let fechas = [];
let descripciones = [];


const cargarNotificacionesUsuario = () => {
    let receptor = localStorage.getItem('correo');
    var datos = {
        receptor: receptor
    }

    fetch("http://localhost:5000/notificaciones/buscar", {
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
                for (let i = 0; i < json.length; i++) {

                    correo[i] = json[i].emisor.trim()
                    fechas[i] = json[i].fecha;
                    descripciones[i] = json[i].descripcion

                }
                cargarListadoNotificaciones(correo, fechas, descripciones);
            }
        )
}

const cargarListadoNotificaciones = (correo, fechas, descripciones) => {

    var datos = {
        correo: correo
    }


    fetch('http://localhost:5000/usuarios/buscar_usuarios_solicitudes',
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
                console.log(json);
                let listado;
                for (let i = 0; i < correo.length; i++) {
                    //si el correo del json es igual al de correo, saco la info de ese usuario
                    for (let j = 0; j < json.length; j++) {
                        if (correo[i] == json[j].correo) {
                            listado = `<div class="listado-nt">
                        <div class="user-nt">
                            <a href="#"><img src="${json[j].imagen_usuario}" /></a>
                        </div>
                        <div class="info-nt">
                            <p><span class="titulo-nt">${json[j].nombre} ${json[j].apellido1} ${json[j].apellido2}</span></p>
                            <p>${descripciones[i]}</p>
                            <p>${new Date(fechas[j]).getUTCFullYear()}-${new Date(fechas[j]).getUTCMonth() + 1}-${new Date(fechas[j]).getUTCDate()}</p> 
                        </div>

                    </div>`;

                        }
                        

                    }

                    document.getElementById('listadoNotificacion').insertAdjacentHTML("beforeend", listado);
                 

                }
            }
        )

}


