const cargarListado = () => {
    fetch("http://localhost:5000/categorias_servicios")
       
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
                        
                        contListado += `<div class="listado">
                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="./../../uploads/${json[i].imagen}" />
                        </div> 
                        <div class="descripcion-info">
                            <h5 class="titulo-categoria">${json[i].nombre}</h5>
                        </div>
                        <div class="button-accion">
                            <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${json[i].nombre}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#"><i class="fas fa-user-times"></i></i></a>
                        </div>
                    </div>

                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="./../../uploads/${json[i+1].imagen}" />
                        </div>
                        <div class="descripcion-info">
                            <h5 class="titulo-categoria">${json[i+1].nombre}</h5>
                        </div>
                        <div class="button-accion">
                            <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${json[i+1].nombre}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#"><i class="fas fa-user-times"></i></i></a>
                        </div>
                    </div>
                </div>`;
                      
                    } else {
                        contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="./../../uploads/${json[i].imagen}" />
                            </div>
                            <div class="descripcion-info">
                                <h5 class="titulo-categoria">${json[i].nombre}</h5>
                            </div>
                            <div class="button-accion">
                                <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${json[i].nombre}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                            </div>
                            <div class="button-accion">
                                <a href="#"><i class="fas fa-user-times"></i></i></a>
                            </div>
                        </div>
                    </div>`
                    }

                    document.getElementById('listado').innerHTML = contListado;
                }
            }
        )
}


const buscar = () => {
    let busqueda = document.getElementById('buscar').value;
    let letrasBusqueda = busqueda.split('');
    listado = document.getElementById('listado');

    fetch("http://localhost:5000/categorias_servicios")
       
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
                            
                        } else {
                            listado.innerHTML = "";
                        }
                    }

                    for (let l = 0; l < nombres.length; l+=2) {
                        if (nombres[l+1] != undefined) {

                            contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="./../../uploads/${imagenes[l]}" />
                            </div> 
                            <div class="descripcion-info">
                                <h5 class="titulo-categoria">${nombres[l]}</h5>
                            </div>
                            <div class="button-accion">
                                <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${nombres[l]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                            </div>
                            <div class="button-accion">
                                <a href="#"><i class="fas fa-user-times"></i></i></a>
                            </div>
                        </div>
                        
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="./../../uploads/${imagenes[l + 1]}" />
                            </div>
                            <div class="descripcion-info">
                                <h5 class="titulo-categoria">${nombres[l + 1]}</h5>
                            </div>
                            <div class="button-accion">
                                <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${nombres[l+1]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                            </div>
                            <div class="button-accion">
                                <a href="#"><i class="fas fa-user-times"></i></i></a>
                            </div>
                        </div>
                    </div>`;
                        } else {
                            contListado += `<div class="listado">
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="./../../uploads/${imagenes[l]}" />
                                </div>
                                <div class="descripcion-info">
                                    <h5 class="titulo-categoria">${nombres[l]}</h5>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria= "${nombres[l]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#"><i class="fas fa-user-times"></i></i></a>
                                </div>
                            </div>
                        </div>`
                        }
                    }
                    
                    listado.innerHTML = contListado;
                }
            }
        )
}

const ver = (element) => {
    const nombre = element.getAttribute('data-nombre-categoria');
    localStorage.setItem('data-nombre-categoria', nombre);
console.log(nombre)
  
}