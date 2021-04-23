const cargarListado = () => {
    fetch("http://localhost:5000/padecimientos/", {
        method:'GET'
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

                        contListado += `<div class="listado">
                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="${json[i].imagen}" />
                        </div>
                        <div class="descripcion-info">
                            <h4 class="titulo-categoria">${json[i].nombre}</h4>
                            <p>Tipo: ${json[i].categoria}</p>
                        </div>
                        <div class="button-accion">
                            <a href="../actualizarPadecimiento/actualizar_padecimiento.html"><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#"><i class="fas fa-trash"></i></a>
                        </div>
                    </div>
                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="${json[i + 1].imagen}" />
                        </div>
                        <div class="descripcion-info">
                            <h4 class="titulo-categoria">${json[i + 1].nombre}</h4>
                            <p>Tipo:${json[i +1].categoria}</p>
                        </div>
                        <div class="button-accion">
                            <a href="../actualizarPadecimiento/actualizar_padecimiento.html"><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#"><i class="fas fa-trash"></i></a>
                        </div>
                    </div>
                </div>`;

                    } else {
                        contListado += `<div class="listado">
                        <div class="info-listado">
                        <div class="img-categoria">
                            <img src="${json[i].imagen}" />
                        </div>
                        <div class="descripcion-info">
                            <h4 class="titulo-categoria">${json[i].nombre}</h4>
                            <p>Tipo: ${json[i].categoria}</p>
                        </div>
                        <div class="button-accion">
                            <a href="../actualizarPadecimiento/actualizar_padecimiento.html"><i class="fas fa-edit"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#"><i class="fas fa-trash"></i></a>
                        </div>
                    </div>`


                    }
                    
                    //document.getElementById('listado').insertAdjacentHTML("beforeend", listado);
                    document.getElementById('listado').innerHTML = contListado;

                }
            }
        )
}

const buscar = () => {
    let busqueda = document.getElementById('buscar').value;
    let letrasBusqueda = busqueda.split('');
    listado = document.getElementById('listado');

    fetch("http://localhost:5000/padecimientos/")
       
        .then(
            response => {
                return response.json();
            }
        )

        .then(
            json => {
                let contListado ="";
                var esBuscado = false;
                let i = 0;
                let nombres = [];
                let imagenes = [];
                let categorias = [];
                let checkNoBuscado = false;
                
                if (busqueda == "") {
                    cargarListado()
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
                            
                            nombres.push(json[i].nombre)
                            imagenes.push(json[i].imagen)
                            categorias.push(json[i].categoria)
                            
                        } else {
                            listado.innerHTML = "";
                        }
                    }

                    for (let l = 0; l < nombres.length; l+=2) {
                        if (nombres[l+1] != undefined) {

                            contListado += `<div class="listado">
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${imagenes[l]}" />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="titulo-categoria">${nombres[l]}</h4>
                                    <p>Tipo: ${categorias[l]}</p>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarPadecimiento/actualizar_padecimiento.html"><i class="fas fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#"><i class="fas fa-trash"></i></a>
                                </div>
                            </div>
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${imagenes[l + 1]}" />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="titulo-categoria">${nombres[l + 1]}</h4>
                                    <p>Tipo:${categorias[l +1]}</p>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarPadecimiento/actualizar_padecimiento.html"><i class="fas fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#"><i class="fas fa-trash"></i></a>
                                </div>
                            </div>
                        </div>`;
                        } else {
                            contListado += `<div class="listado">
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${imagenes[l]}" />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="titulo-categoria">${nombres[l]}</h4>
                                    <p>Tipo: ${categorias[l]}</p>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarPadecimiento/actualizar_padecimiento.html"><i class="fas fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#"><i class="fas fa-trash"></i></a>
                                </div>
                            </div>`
                        }
                    }
                    
                    listado.innerHTML = contListado;
                }
            }
        )
}
