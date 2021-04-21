let denunciantes = [];
let denunciados = [];
let fechas = [];
let motivos = [];
let categorias = [];
const cargarListadoDenuncias = () => {

    fetch("http://localhost:5000/denuncias/")
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {

                for (let i = 0; i < json.length; i++) {

                    denunciantes[i] = json[i].denunciante;
                    denunciados[i] = json[i].denunciado;
                    motivos[i] = json[i].motivo;
                    fechas[i] = json[i].fecha;
                    categorias[i] = json[i].categoria;
                }

                cargarListado();


            }
        )
}


//Ahorita sólo necesito listar la info del denunciante y pasar el correo del denunciado
const cargarListado = () => {

    let datos = {
        correo: denunciantes
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

                let contListado = "";
                for (let i = 0; i < json.length; i += 2) {


                    if (json[i + 1] !== undefined) {
                        let hours = new Date(fechas[i]).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;


                        let hours2 = new Date(fechas[i + 1]).getHours();
                        let finalHour2 = hours2 >= 13 ? hours2 - 12 : hours2;

                        let finalHourFormatted2 = finalHour2 <= 9 ? '0' + finalHour2 : finalHour2;


                        contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-user">
                                <img src="../../img/man1.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h4>
                                <p class="margin-top">${categorias[i]}</p>
                                <p class="margin-top">${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[i]).getMinutes()} ${(new Date(fechas[i]).getHours() >= 12 && new Date(fechas[i]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button">
                                <a href="../informacionDenuncia/informacion_denuncia.html" class="button button-aceptar" data-denuncia = "${denunciados[i]}" data-motivo = "${motivos[i]}" onclick="ver(this)">Revisar</a>
                            </div>
                        </div>
                        <div class="info-listado">
                            <div class="img-user">
                                <img src="../../img/mujer1.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i + 1].nombre} ${json[i + 1].apellido1} ${json[i + 1].apellido2}</h4>
                                <p class="margin-top">${categorias[i + 1]}</p>
                                <p class="margin-top">${new Date(fechas[i + 1]).getUTCFullYear()}-${new Date(fechas[i + 1]).getUTCMonth() + 1}-${new Date(fechas[i + 1]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted2}:${new Date(fechas[i + 1]).getMinutes()} ${(new Date(fechas[i + 1]).getHours() >= 12 && new Date(fechas[i + 1]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button">
                                <a href="../informacionDenuncia/informacion_denuncia.html" class="button button-aceptar" data-denuncia = "${denunciados[i + 1]}" data-motivo = "${motivos[i + 1]}" onclick="ver(this)">Revisar</a>
                            </div>
                        </div>
                    </div>`;

                    } else {
                        let hours = new Date(fechas[i]).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;

                        contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-user">
                                <img src="../../img/man1.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h4>
                                <p class="margin-top">${categorias[i]}</p>
                                <p class="margin-top">${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[i]).getMinutes()} ${(new Date(fechas[i]).getHours() >= 12 && new Date(fechas[i]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button">
                                <a href="../informacionDenuncia/informacion_denuncia.html" class="button button-aceptar" data-denuncia = "${denunciados[i]}" data-motivo = "${motivos[i]}" onclick="ver(this)">Revisar</a>
                            </div>
                        </div>
                    </div>`


                    }


                    document.getElementById('listado').innerHTML = contListado;

                }
            }
        )

}



//Ahorita sólo necesito listar la info del denunciante y pasar el correo del denunciado
const buscar = () => {
    let busqueda = document.getElementById('buscar').value;
    let letrasBusqueda = busqueda.split('');
    listado = document.getElementById('listado');

    let datos = {
        correo: denunciantes
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
                let contListado = "";
                var esBuscado = false;
                let checkNoBuscado = false;
                let i = 0;
                let nombres = [];
                let imagenes = [];
                let correos = [];
                let apellidos1 = [];
                let apellidos2 = [];

                if (busqueda == "") {
                    cargarListado();
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
                            correos.push(json[i].correo);
                            apellidos1.push(json[i].apellido1);
                            apellidos2.push(json[i].apellido2);

                        } else {
                            listado.innerHTML = "";
                        }
                    }


                }

                for (let l = 0; l < nombres.length; l += 2) {


                    if (nombres[l + 1] !== undefined) {
                        let hours = new Date(fechas[l]).getHours();
                        let finalHour = hours >= 13 ? hours - 12 : hours;

                        let finalHourFormatted = finalHour <= 9 ? '0' + finalHour : finalHour;


                        let hours2 = new Date(fechas[l + 1]).getHours();
                        let finalHour2 = hours2 >= 13 ? hours2 - 12 : hours2;

                        let finalHourFormatted2 = finalHour2 <= 9 ? '0' + finalHour2 : finalHour2;


                        contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-user">
                                <img src="../../img/man1.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${nombres[l]} ${apellidos1[l]} ${apellidos2[l]}</h4>
                                <p class="margin-top">${categorias[l]}</p>
                                <p class="margin-top">${new Date(fechas[l]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[l]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[l]).getMinutes()} ${(new Date(fechas[l]).getHours() >= 12 && new Date(fechas[l]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button">
                                <a href="../informacionDenuncia/informacion_denuncia.html" class="button button-aceptar" data-denuncia = "${denunciados[l]}" data-motivo = "${motivos[l]}" onclick="ver(this)">Revisar</a>
                            </div>
                        </div>
                        <div class="info-listado">
                            <div class="img-user">
                                <img src="../../img/mujer1.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${nombres[l + 1]} ${apellidos1[l + 1]} ${apellidos2[l + 1]}</h4>
                                <p class="margin-top">${categorias[l + 1]}</p>
                                <p class="margin-top">${new Date(fechas[l + 1]).getUTCFullYear()}-${new Date(fechas[l + 1]).getUTCMonth() + 1}-${new Date(fechas[l + 1]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted2}:${new Date(fechas[l + 1]).getMinutes()} ${(new Date(fechas[l + 1]).getHours() >= 12 && new Date(fechas[l + 1]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button">
                                <a href="../informacionDenuncia/informacion_denuncia.html" class="button button-aceptar" data-denuncia = "${denunciados[l + 1]}" data-motivo = "${motivos[l + 1]}" onclick="ver(this)">Revisar</a>
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
                                <img src="../../img/man1.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${nombres[l]} ${apellidos1[l]} ${apellidos2[l]}</h4>
                                <p class="margin-top">${categorias[l]}</p>
                                <p class="margin-top">${new Date(fechas[l]).getUTCFullYear()}-${new Date(fechas[l]).getUTCMonth() + 1}-${new Date(fechas[l]).getUTCDate()}</p>
                                <p class="margin-top">${finalHourFormatted}:${new Date(fechas[l]).getMinutes()} ${(new Date(fechas[l]).getHours() >= 12 && new Date(fechas[l]).getHours() <= 23) ? 'PM' : 'AM'}</p>
                            </div>
                            <div class="button">
                                <a href="../informacionDenuncia/informacion_denuncia.html" class="button button-aceptar" data-denuncia = "${denunciados[l]}" data-motivo = "${motivos[l]}" onclick="ver(this)">Revisar</a>
                            </div>
                        </div>
                    </div>`


                    }

                }
                listado.innerHTML = contListado;
            }
        )

}


const ver = (element) => {

    const correo = element.getAttribute('data-denuncia');
    const motivo = element.getAttribute('data-motivo');
    let datos = {
        persona: correo,
        motivo: motivo
    }
    var jsonDatos = JSON.stringify(datos);
    localStorage.setItem('data-denuncia', jsonDatos);

}




