let nombres = [];
let imagenes = [];


const cargarSeleccion = () => {
    fetch("http://localhost:5000/categorias_mascotas")
        .then(
            response => {
                return response.json();
            }
        )

        .then(
            json => {
                let contListado = "";

                for (let i = 0; i < json.length; i++) {
                    contListado += `<option value="${json[i].nombre}">
                    ${json[i].nombre}
                </option>`;
                }

                document.getElementById('seleccion').innerHTML = contListado;

                obtenerTipos();
            }
        )
}


const obtenerTipos = () => {
    fetch("http://localhost:5000/razas")
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                var esBuscado = false;
                let i = 0;
                let checkNoBuscado = false;
                let seleccion = document.getElementById('seleccion').value;
                nombres = [];
                imagenes = [];

                for (i = 0; i < json.length; i++) {
                    checkNoBuscado = false;

                    if (!checkNoBuscado) {
                        if (seleccion == json[i].categoria) {
                            esBuscado = true;
                        } else {
                            esBuscado = false;
                            checkNoBuscado = true;
                        }
                    }

                    if (esBuscado) {
                        nombres.push(json[i].nombre)
                        imagenes.push(json[i].imagen)
                    }
                }

                let busqueda = document.getElementById('buscar').value;
                if (busqueda == "") {
                    setTimeout('cargarListado()', 650);
                } else {
                    setTimeout('buscar()', 650);
                }
            }
        );
}


const cargarListado = () => {
    let contListado = "";

    if (nombres[0] != undefined) {
        for (let i = 0; i < nombres.length; i += 2) {

            if (nombres[i + 1] !== undefined) {

                contListado += `<div class="listado">
            <div class="info-listado">
                <div class="img-categoria">
                    <img src="./../../uploads/${imagenes[i]}" />
                </div> 
                <div class="descripcion-info">
                    <h5 class="titulo-categoria">${nombres[i]}</h5>
                </div>
                <div class="button-accion">
                    <a href="../actualizarRaza/actualizar_raza.html" data-raza = "${nombres[i]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                </div>
                <div class="button-accion">
                    <a href="#" onclick="eliminar('${nombres[i]}')"><i class="fas fa-user-times"></i></i></a>
                </div>
            </div>
    
            <div class="info-listado">
                <div class="img-categoria">
                    <img src="./../../uploads/${imagenes[i + 1]}" />
                </div>
                <div class="descripcion-info">
                    <h5 class="titulo-categoria">${nombres[i + 1]}</h5>
                </div>
                <div class="button-accion">
                    <a href="../actualizarRaza/actualizar_raza.html" data-raza = "${nombres[i + 1]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                </div>
                <div class="button-accion">
                    <a href="#" onclick="eliminar('${nombres[i + 1]}')"><i class="fas fa-user-times"></i></i></a>
                </div>
            </div>
        </div>`;
            } else {
                contListado += `<div class="listado">
                <div class="info-listado">
                    <div class="img-categoria">
                        <img src="./../../uploads/${imagenes[i]}" />
                    </div>
                    <div class="descripcion-info">
                        <h5 class="titulo-categoria">${nombres[i]}</h5>
                    </div>
                    <div class="button-accion">
                        <a href="../actualizarRaza/actualizar_raza.html" data-raza = "${nombres[i]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                    </div>
                    <div class="button-accion">
                        <a href="#" onclick="eliminar('${nombres[i]}')"><i class="fas fa-user-times"></i></i></a>
                    </div>
                </div>
            </div>`;
            }
        }
    } else {
        contListado = `<div class="buscar">
            <p>En el momento no se ha registrado una raza de la categoría de mascotas.<br />
            ¿Por qué no registra una con el botón de abajo?</p>
        </div>`;
    }

    document.getElementById('listado').innerHTML = contListado;
}


const buscar = () => {
    obtenerTipos();
    let busqueda = document.getElementById('buscar').value;
    let letrasBusqueda = busqueda.split('');
    let listado = document.getElementById('listado');


    var esBuscado = false;
    let i = 0;
    let checkNoBuscado = false;
    let nombresBuscados = [];
    let imagenesBuscadas = [];
    let contListado = "";

    if (busqueda == "") {
        cargarListado()
    } else {
        for (i = 0; i < nombres.length; i++) {
            let letrasNombre = nombres[i].split('');
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
                nombresBuscados.push(nombres[i])
                imagenesBuscadas.push(imagenes[i])
            }
        }

        if (nombresBuscados[0] != undefined) {
            for (let l = 0; l < nombresBuscados.length; l += 2) {
                if (nombresBuscados[l + 1] != undefined) {

                    contListado += `<div class="listado">
                <div class="info-listado">
                    <div class="img-categoria">
                        <img src="./../../uploads/${imagenesBuscadas[l]}" />
                    </div> 
                    <div class="descripcion-info">
                        <h5 class="titulo-categoria">${nombresBuscados[l]}</h5>
                    </div>
                    <div class="button-accion">
                        <a href="../actualizarRaza/actualizar_raza.html" data-raza = "${nombresBuscados[l]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                    </div>
                    <div class="button-accion">
                        <a href="#" onclick="eliminar('${nombresBuscados[l]}')"><i class="fas fa-user-times"></i></i></a>
                    </div>
                </div>
                            
                <div class="info-listado">
                    <div class="img-categoria">
                        <img src="./../../uploads/${imagenesBuscadas[l + 1]}" />
                    </div>
                    <div class="descripcion-info">
                        <h5 class="titulo-categoria">${nombresBuscados[l + 1]}</h5>
                    </div>
                    <div class="button-accion">
                        <a href="../actualizarRaza/actualizar_raza.html" data-raza = "${nombresBuscados[l + 1]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                    </div>
                    <div class="button-accion">
                        <a href="#" onclick="eliminar('${nombresBuscados[l + 1]}')"><i class="fas fa-user-times"></i></i></a>
                    </div>
                </div>
            </div>`;
                } else {
                    contListado += `<div class="listado">
                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="./../../uploads/${imagenesBuscadas[l]}" />
                        </div>
                        <div class="descripcion-info">
                            <h5 class="titulo-categoria">${nombresBuscados[l]}</h5>
                        </div>
                        <div class="button-accion">
                            <a href="../actualizarRaza/actualizar_raza.html" data-raza = "${nombresBuscados[l]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#" onclick="eliminar('${nombresBuscados[l]}')"><i class="fas fa-user-times"></i></i></a>
                        </div>
                    </div>
                </div>`
                }
            }
        } else {
            contListado = `<div class="buscar">
                <p>No se encontró lo que se quería buscar.</p>
            </div>`;
        }

        listado.innerHTML = contListado;
    }

}


const ver = (element) => {
    const nombre = element.getAttribute('data-raza');
    localStorage.setItem('data-raza', nombre);
}


const eliminar = nombre => {
    Swal.fire({
        title: '¿Está seguro?',
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
                'La raza ha sido eliminada.',
                'success'
            )
            deleteRaza(nombre);
            insertarAccion()

            setTimeout('obtenerTipos()', 650);

        }
    })
}


const deleteRaza = nombre => {
    var datos = {
        nombre: nombre,

    }

    fetch("http://localhost:5000/razas/eliminar", {
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


const insertarAccion = () => {
    let correo = localStorage.getItem('correo');

    let hoy = new Date();
    var infoAccion = {
        usuario: correo,
        accion: "Eliminar raza",
        fecha: hoy
    }

    fetch("http://localhost:5000/acciones/insertar", {
        method: 'POST',
        body: JSON.stringify(infoAccion),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            respuesta => {
                return respuesta.json();
            }
        );
}