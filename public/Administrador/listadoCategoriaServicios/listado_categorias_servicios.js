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

                if (json[0] != undefined) {
                    for (let i = 0; i < json.length; i+=2) {

                        if (json[i+1] !== undefined) {
                            
                            contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagen}" />
                            </div> 
                            <div class="descripcion-info">
                                <h5 class="titulo-categoria">${json[i].nombre}</h5>
                            </div>
                            <div class="button-accion">
                                <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${json[i].nombre}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                            </div>
                            <div class="button-accion">
                                <a href="#" onclick="eliminar('${json[i].nombre}')"><i class="fas fa-user-times"></i></i></a>
                            </div>
                        </div>
    
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i+1].imagen}" />
                            </div>
                            <div class="descripcion-info">
                                <h5 class="titulo-categoria">${json[i+1].nombre}</h5>
                            </div>
                            <div class="button-accion">
                                <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${json[i+1].nombre}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                            </div>
                            <div class="button-accion">
                                <a href="#" onclick="eliminar('${json[i+1].nombre}')"><i class="fas fa-user-times"></i></i></a>
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
                                    <h5 class="titulo-categoria">${json[i].nombre}</h5>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${json[i].nombre}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#" onclick="eliminar('${json[i].nombre}')"><i class="fas fa-user-times"></i></i></a>
                                </div>
                            </div>
                        </div>`
                        }
                    }
                } else {
                    contListado = `<div class="buscar">
                        <p>En el momento no se ha registrado una categoría de servicios.<br />
                        ¿Por qué no registra una con el botón de abajo?</p>
                    </div>`;
                }

                document.getElementById('listado').innerHTML = contListado;
            }
        )
}


const buscar = () => {
    let busqueda = document.getElementById('buscar').value;
    let letrasBusqueda = busqueda.split('');
    let listado = document.getElementById('listado');

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
                            
                        }
                    }

                    if (nombres[0] != undefined) {
                        for (let l = 0; l < nombres.length; l+=2) {
                        
                            if (nombres[l+1] != undefined) {
    
                                contListado = `<div class="listado">
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${imagenes[l]}" />
                                </div> 
                                <div class="descripcion-info">
                                    <h5 class="titulo-categoria">${nombres[l]}</h5>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${nombres[l]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#" onclick="eliminar('${nombres[l]}')"><i class="fas fa-user-times"></i></i></a>
                                </div>
                            </div>
                            
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${imagenes[l + 1]}" />
                                </div>
                                <div class="descripcion-info">
                                    <h5 class="titulo-categoria">${nombres[l + 1]}</h5>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${nombres[l+1]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#" onclick="eliminar('${nombres[l+1]}')"><i class="fas fa-user-times"></i></i></a>
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
                                        <h5 class="titulo-categoria">${nombres[l]}</h5>
                                    </div>
                                    <div class="button-accion">
                                        <a href="../actualizarCategoriaServicio/actualizar_categoria_servicio.html" data-nombre-categoria = "${nombres[l]}" onclick="ver(this)"><i class="far fa-edit"></i></a>
                                    </div>
                                    <div class="button-accion">
                                        <a href="#" onclick="eliminar('${nombres[l]}')"><i class="fas fa-user-times"></i></i></a>
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
        )
}

const ver = (element) => {
    const nombre = element.getAttribute('data-nombre-categoria');
    localStorage.setItem('data-nombre-categoria', nombre);
console.log(nombre)
  
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
            'La categoría ha sido eliminada.',
            'success'
          )
          deleteCategoria(nombre);
          insertarAccion()
            
          let busqueda = document.getElementById('buscar').value;
          if (busqueda == "") {
            setTimeout('cargarListado()', 650);
          } else {
            setTimeout('buscar()', 650);
          }
          
        }
      })
}



const deleteCategoria = nombre => {
    var datos = {
        nombre: nombre,
       
    }
  
    fetch("http://localhost:5000/categorias_servicios/eliminar", {
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
          accion: "Eliminar categoría de servicios",
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