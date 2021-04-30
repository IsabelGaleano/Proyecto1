let nombre = "";
const cargarListado = () => {
    let usuario = localStorage.getItem('data-correoBitacora');
    var datos = {
        usuario: usuario
    }

    console.log(datos)

    obtenerNombre();

    fetch("http://localhost:5000/acciones/buscar",{
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
                let contListado = `<tr>
                    <th>Nombre</th>
                    <th>Acción</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                </tr>`;
                let tabla = document.getElementById('listado');
                if (json[0] != undefined) {
                    for (let i = 0; i < json.length; i++) {
                        let fecha = new Date(json[i].fecha);
                        let anno = fecha.getUTCFullYear();
                        let mes = fecha.getUTCMonth() + 1;
                        let dia = fecha.getDay();
                        let hora = fecha.getUTCHours();
                        let minuto = fecha.getUTCMinutes();
                            contListado += `<tr>
                            <td>${nombre}</td>
                            <td>${json[i].accion}</td>
                            <td>${anno}-${mes}-${dia}</td>`;
                            if (hora < 12) {
                                contListado += `<td>${hora}:`;
                                if (minuto < 10) {
                                    contListado += `0${minuto}`;
                                } else {
                                    contListado += `${minuto}`;
                                }
                                contListado += ` AM</td>`;
                            } else {
                                if (hora > 12) {
                                    hora -= 12;
                                }
                                contListado += `<td>${hora}:`;
                                if (minuto < 10) {
                                    contListado += `0${minuto}`;
                                } else {
                                    contListado += `${minuto}`;
                                }
                                contListado += ` PM</td>`;
                            }
    
                            contListado += `</tr>`;
                    }
                } else {
                    contListado = `<tr>
                    <td>Este usuario no ha hecho ninguna acción.</td>
                    </tr>`;
                    tabla.classList.add('no-acciones');
                }
                

                document.getElementById('listado').innerHTML = contListado;
            }
        )
}


const obtenerNombre = () => {
    let correo = localStorage.getItem('data-correoBitacora');
    var datos = {
        correo: correo
    }


    fetch("http://localhost:5000/usuarios/buscar",{
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
                nombre += json[0].nombre + " ";
                nombre += json[0].apellido1 + " ";
                nombre += json[0].apellido2;
            }
        )
}