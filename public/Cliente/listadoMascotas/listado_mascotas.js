const cargarListado = () => {
    let correo = localStorage.getItem('correo')
    console.log(correo)
    var datos = {
        duenno: correo
    }
    fetch("http://localhost:5000/mascotas/buscar/", {
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

                        contListado += `<div class="listado">
                                <div class="info-listado">
                                    <div class="img-categoria">
                                        <img src="${json[i].foto_mascota}" />
                                    </div>
                                    <div class="descripcion-info">
                                        <h4 class="titulo-categoria">${json[i].nombre}</h4>
                                    </div>
                                    <div class="button-accion">
                                        <a href="../perfilMascota/perfil_mascota.html"  data-nombre = "${json[i].nombre}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                                    </div>
                                    <div class="button-accion">
                                        <a href="#" onclick="eliminar('${json[i].nombre}')"><i class="fas fa-trash"></i></a>
                                    </div>
                                </div>
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${json[i + 1].foto_mascota}" />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="titulo-categoria">${json[i + 1].nombre}</h4>
                                </div>
                                <div class="button-accion">
                                    <a href="../perfilMascota/perfil_mascota.html"  data-nombre = "${json[i + 1].nombre}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#" onclick="eliminar('${json[i + 1].nombre}')"><i class="fas fa-trash"></i></a>
                                </div>
                            </div>
                            </div>`

                    } else {
                        contListado += `<div class="listado">
                            <div class="info-listado">
                                    <div class="img-categoria">
                                        <img src="${json[i].foto_mascota}" />
                                    </div>
                                    <div class="descripcion-info">
                                        <h4 class="titulo-categoria">${json[i].nombre}</h4>
                                    </div>
                                    <div class="button-accion">
                                        <a href="../perfilMascota/perfil_mascota.html"  data-nombre = "${json[i].nombre}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                                    </div>
                                    <div class="button-accion">
                                        <a href="#" onclick="eliminar('${json[i].nombre}')"><i class="fas fa-trash"></i></a>
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
    let correo = localStorage.getItem('correo')
    var datos = {
        duenno: correo
    }

    fetch("http://localhost:5000/mascotas/buscar/", {
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
                            imagenes.push(json[i].foto_mascota)

                        } else {
                            listado.innerHTML = "";
                        }
                    }

                    for (let l = 0; l < nombres.length; l += 2) {
                        if (nombres[l + 1] != undefined) {

                            contListado += `<div class="listado">
                                        <div class="info-listado">
                                            <div class="img-categoria">
                                                <img src="${imagenes[l]}" />
                                            </div>
                                            <div class="descripcion-info">
                                                <h4 class="titulo-categoria">${nombres[l]}</h4>
                                            </div>
                                            <div class="button-accion">
                                                <a href="../perfilMascota/perfil_mascota.html"  data-nombre = "${nombres[l]}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                                            </div>
                                            <div class="button-accion">
                                                <a href="#" onclick="eliminar('${nombres[l]}')"><i class="fas fa-trash"></i></a>
                                            </div>
                                        </div>
                                    <div class="info-listado">
                                        <div class="img-categoria">
                                            <img src="${imagenes[l + 1]}" />
                                        </div>
                                        <div class="descripcion-info">
                                            <h4 class="titulo-categoria">${nombres[l + 1]}</h4>
                                        </div>
                                        <div class="button-accion">
                                            <a href="../perfilMascota/perfil_mascota.html"  data-nombre = "${nombres[l + 1]}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                                        </div>
                                        <div class="button-accion">
                                            <a href="#" onclick="eliminar('${nombres[l + 1]}')"><i class="fas fa-trash"></i></a>
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
                                                </div>
                                                <div class="button-accion">
                                                    <a href="../perfilMascota/perfil_mascota.html"  data-nombre = "${nombres[l]}" onclick="ver(this)">i class="far fa-eye"></i></a>
                                                </div>
                                                <div class="button-accion">
                                                    <a href="#" onclick="eliminar('${nombres[l]}')"><i class="fas fa-trash"></i></a>
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
    console.log(element)
    const nombre = element.getAttribute('data-nombre');
    localStorage.setItem('data-mascotaC', nombre);

}


const eliminar = nombre => {
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
          deleteMascota(nombre);
        }
      })
}



const deleteMascota = nombre => {
    let duenno = localStorage.getItem('correo');
    var datos = {
        duenno: duenno,
        nombre: nombre
    }
  
    fetch("http://localhost:5000/mascotas/eliminar_mascota", {
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