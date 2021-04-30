
const cargarListado = () => {
    let tipoUsuario = "cliente";
    var datos = {
        tipo_usuario: tipoUsuario
    }

    fetch("http://localhost:5000/usuarios/buscar_tipo_usuario", {
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
                            <img src="${json[i].imagen_usuario}" />
                        </div> 
                        <div class="descripcion-info">
                            <h5 class="titulo-categoria">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h5>
                        </div>
                        <div class="button-accion">
                            <a href="../perfilClienteAdmi/perfil_cliente_admi.html" data-correo = "${json[i].correo}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#" onclick="eliminar('${json[i].correo}')"><i class="fas fa-user-times"></i></i></a>
                        </div>
                    </div>

                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="${json[i+1].imagen_usuario}" />
                        </div>
                        <div class="descripcion-info">
                            <h5 class="titulo-categoria">${json[i + 1].nombre} ${json[i + 1].apellido1} ${json[i + 1].apellido2}</h5>
                        </div>
                        <div class="button-accion">
                            <a href="../perfilClienteAdmi/perfil_cliente_admi.html" data-correo = "${json[i+1].correo}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#" onclick="eliminar('${json[i + 1].correo}')"><i class="fas fa-user-times"></i></i></a>
                        </div>
                    </div>
                </div>`;

                    } else {
                        contListado += `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagen_usuario}" />
                            </div>
                            <div class="descripcion-info">
                                <h5 class="titulo-categoria">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}</h5>
                            </div>
                            <div class="button-accion">
                                <a href="../perfilClienteAdmi/perfil_cliente_admi.html" data-correo = "${json[i].correo}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                            </div>
                            <div class="button-accion">
                                <a href="#" onclick="eliminar('${json[i].correo}')"><i class="fas fa-user-times"></i></i></a>
                            </div>
                        </div>
                    </div>`


                    }
                    

                    document.getElementById('listado').innerHTML = contListado;

                }
            }
        )
}




const ver = (element) => {
    const correo = element.getAttribute('data-correo');
    console.log(correo);
    localStorage.setItem('data-correo', correo);

  
}

const eliminar = correo => {
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
          deleteUsuario(correo);
          enviarEmailBloqueo(correo);
          insertarAccion();
        }
      })
}


const insertarAccion = () => {
    let correo = localStorage.getItem('correo');
  
    let hoy = new Date();
    var infoAccion = {
      usuario: correo,
      accion: 'Bloquear cliente',
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



const deleteUsuario = correo => {
    var datos = {
        correo: correo,
       
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

  

const enviarEmailBloqueo = correo => {
   
    let datos = {
        correo: correo
    }
    fetch("http://localhost:5000/usuarios/send_email_bloqueo_cliente", {
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
  

  

const buscar = () => {
    let busqueda = document.getElementById('buscar').value;
    let letrasBusqueda = busqueda.split('');
    listado = document.getElementById('listado');

    fetch("http://localhost:5000/usuarios/")
       
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
                let correos = [];
                let apellidos1 = [];
                let apellidos2 = [];
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
                            
                            nombres.push(json[i].nombre);
                            imagenes.push(json[i].imagen_usuario);
                            correos.push(json[i].correo);
                            apellidos1.push(json[i].apellido1);
                            apellidos2.push(json[i].apellido2);
                            
                        } else {
                            listado.innerHTML = "";
                        }
                    }

                    for (let l = 0; l < nombres.length; l+=2) 
                    {
                        if (nombres[l+1] != undefined) {

                            contListado += `<div class="listado">
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${imagenes[l]}" />
                                </div> 
                                <div class="descripcion-info">
                                    <h5 class="titulo-categoria">${nombres[l]} ${apellidos1[l]} ${apellidos2[l]}</h5>
                                </div>
                                <div class="button-accion">
                                    <a href="../perfilClienteAdmi/perfil_cliente_admi.html" data-correo = "${correos[l]}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#" onclick="eliminar('${correos[l]}')"><i class="fas fa-user-times"></i></i></a>
                                </div>
                            </div>
        
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${imagenes[l+1]}" />
                                </div>
                                <div class="descripcion-info">
                                    <h5 class="titulo-categoria">${nombres[l+1]} ${apellidos1[l+1]} ${apellidos2[l+1]}</h5>
                                </div>
                                <div class="button-accion">
                                    <a href="../perfilClienteAdmi/perfil_cliente_admi.html" data-correo = "${correos[l+1]}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#" onclick="eliminar('${correos[l+1]}')"><i class="fas fa-user-times"></i></i></a>
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
                                    <h5 class="titulo-categoria">${nombres[l]} ${apellidos1[l]} ${apellidos2[l]}</h5>
                                </div>
                                <div class="button-accion">
                                    <a href="../perfilClienteAdmi/perfil_cliente_admi.html" data-correo = "${correos[l]}" onclick="ver(this)"><i class="far fa-eye"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#" onclick="eliminar('${correos[l]}')"><i class="fas fa-user-times"></i></i></a>
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