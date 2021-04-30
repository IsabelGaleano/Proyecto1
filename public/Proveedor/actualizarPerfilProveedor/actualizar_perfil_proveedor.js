cargarProvincias();
document.querySelector('#revisarProveedor').addEventListener('click', e => {
    let revisar = document.getElementById("revisarProveedor");
    let error = revisarForm();
    let correo = document.getElementById("correo");
    let validar = validarEmail(correo.value);
    let cedula = document.getElementById('identificacion').value;
    let tipo = document.getElementById('tipo_identificacion').value;
    let validacionCedula = getCedula(cedula, tipo);
    if (!error) {
        let fechaNacimiento = calcularEdad();
        if (fechaNacimiento >= 18) {
            if (validar) {
                if (validacionCedula) {
                    actualizarProveedor();
                    revisar.setAttribute("href", "../perfilProveedor/perfil_proveedor.html")

                } else {

                    Swal.fire({
                        title: 'Error!',
                        text: 'Cédula incorrecta',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    })


                }
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Correo incorrecto',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })

            }

        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No es mayor de edad',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })

        }

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


})


const cargarPerfil = () => {
    let correo = localStorage.getItem('correo');
    var datos = {
        correo: correo
    }

    fetch("http://localhost:5000/usuarios/buscar", {
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

                let fechaNacimiento;
                for (let i = 0; json.length > i; i++) {
                    fechaNacimiento = format(json[i].fecha_nacimiento);
                    document.getElementById('nombre').value = json[i].nombre;
                    document.getElementById('apellido1').value = json[i].apellido1;
                    document.getElementById('apellido2').value = json[i].apellido2;
                    document.getElementById('correo').value = json[i].correo;
                    document.getElementById('identificacion').value = json[i].identificacion;
                    document.getElementById('telefono').value = json[i].telefono;
                    fechaNacimiento = format(json[i].fecha_nacimiento)
                    document.getElementById('fecha_nacimiento').value = fechaNacimiento;
                    buscarTipoIdenficacion(json[i].tipo_identificacion);
                    setProvincia(json[i].provincia, json[i].canton, json[i].distrito);
                    document.getElementById('imagenUsuario').src = json[i]?.imagen_usuario
                        ? json[i].imagen_usuario
                        : '../../img/placeholder-User.jpg';
                }


            }
        )
}

const actualizarProveedor = () => {
    //let correo = localStorage.getItem('correo');
    let correo = localStorage.getItem('correo');
    let nombre = document.getElementById("nombre").value;
    let apellido1 = document.getElementById("apellido1").value;
    let apellido2 = document.getElementById("apellido2").value;
    let tipo_identificacion = document.getElementById("tipo_identificacion").value;
    let identificacion = document.getElementById("identificacion").value;
    let telefono = document.getElementById("telefono").value;
    let fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
    let idProvincia = document.getElementById("provincia").value;
    let provincia = getProvincia(idProvincia);
    let idCanton = document.getElementById("canton").value;
    let canton = getCanton(idCanton);
    let idDistrito = document.getElementById("distrito").value;
    let distrito = getDistrito(idDistrito);
    var datos = {
        correo: correo,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        tipo_identificacion: tipo_identificacion,
        identificacion: identificacion,
        telefono: telefono,
        fecha_nacimiento: fecha_nacimiento,
        provincia: provincia,
        canton: canton,
        distrito: distrito,
        imagen_usuario: document.getElementById('imagenUsuario').src
    }

    fetch("http://localhost:5000/usuarios/actualizar_proveedor", {
        method: 'PUT',
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

const getProvincia = idProvincia => {

    let provincias = document.getElementById('provincia').childNodes;
    for (let i = 0; i < provincias.length; i++) {
        if (provincias[i].tagName === 'OPTION') {
            if (provincias[i].value == idProvincia) {
                return provincias[i].innerText;
            }
        }
    }
}

const getCanton = idCanton => {

    let cantones = document.getElementById('canton').childNodes;
    for (let i = 0; i < cantones.length; i++) {
        if (cantones[i].tagName === 'OPTION') {
            if (cantones[i].value == idCanton) {
                return cantones[i].innerText;
            }

        }


    }


}

const getDistrito = idDistito => {

    let distritos = document.getElementById('distrito').childNodes;
    for (let i = 0; i < distritos.length; i++) {
        if (distritos[i].tagName === 'OPTION') {
            if (distritos[i].value == idDistito) {
                return distritos[i].innerText;
            }

        }


    }


}

const obtenerFecha = (fechaNacimiento) => {

    let fecha = `${new Date(fechaNacimiento).getUTCFullYear()}-${new Date(fechaNacimiento).getUTCMonth() + 1}-${new Date(fechaNacimiento).getUTCDate()}`;
    return fecha;

}



const setProvincia = (nameProvincia, nameCanton, nameDistrito) => {
    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then(res => res.json())
        .then(data => {
            let provincias = document.getElementById('provincia');//Obtengo el elemento select

            for (const [key, value] of Object.entries(data)) {

                if (value === nameProvincia) { //Aquí comparo si el valor (que es el nombre de la provincia) es igual al valor que paso por parametros
                    provincias.selectedIndex = key - 1;

                }
            }
            setCanton(nameCanton, nameDistrito);
        });

}


const setCanton = (nameCanton, nameDistrito) => {
    let provincia = document.getElementById('provincia').value;
    let url = "https://ubicaciones.paginasweb.cr/provincia/" + provincia + "/cantones.json";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let cantones = document.getElementById('canton');//Obtengo el elemento select
            for (const [key, value] of Object.entries(data)) {

                if (value === nameCanton) {
                    cantones.selectedIndex = key - 1;
                    let linea = "<option value='" + key + "' selected>" + value + "</option>";
                    cantones.insertAdjacentHTML('beforeend', linea)

                }
            }
            setDistrito(nameDistrito);

        });

}

const setDistrito = nameDistrito => {
    let provincia = document.getElementById('provincia').value;
    let canton = document.getElementById('canton').value;
    let url = "https://ubicaciones.paginasweb.cr/provincia/" + provincia + "/canton/" + canton + "/distritos.json"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let distritos = document.getElementById('distrito');//Obtengo el elemento select
            for (const [key, value] of Object.entries(data)) {

                if (value === nameDistrito) {
                    distritos.selectedIndex = key - 1;
                    let linea = "<option value='" + key + "' selected>" + value + "</option>";
                    distritos.insertAdjacentHTML('beforeend', linea)

                }
            }

        });

}

function format(date) {
    date = new Date(date);

    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
}

const buscarTipoIdenficacion = tipoIdentificacion => {
    var select = document.getElementById("tipo_identificacion");
    for (let i = 1; i < select.length; i++) {
        if (select.options[i].text == tipoIdentificacion) {

            select.selectedIndex = i;



        }
    }
}



const imgPreview = async (e) => {
    try {
        const img = e.files[0];
  
        if (img) {
            const base64Img = await toBase64(img);
            document.getElementById('imagenUsuario').src = base64Img;
        }
    } catch (e) {
        throw e;
    }
  };
  