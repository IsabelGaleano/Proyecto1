
var marker;
document.querySelector('#revisarCliente').addEventListener('click', e => {
    let revisar = document.getElementById("revisarCliente");
    let error = revisarForm();
    let correo = document.getElementById("correo");
    let validar = validarEmail(correo.value);
    let cedula = document.getElementById('identificacion').value;
    let tipo = document.getElementById('tipo_identificacion').value;
    let validacionCedula = getCedula(cedula, tipo);
    let validacionUsuario = validarUsuario();
    if (!error) {
        let fechaNacimiento = calcularEdad();
        if (fechaNacimiento >= 18) {
            if (validar) {
                if (validacionCedula) {

                    registrarCliente();
                    localMascota();
                    revisar.setAttribute("href", "../registroMascota/registro_mascota.html")


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

// Initialize and add the map
function initMap() {
    var myLatlng = new google.maps.LatLng(9.9333, -84.0833);
    var mapOptions = {
        zoom: 4,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    marker = new google.maps.Marker({
        position: myLatlng,
        title: "Hello World!",
        map: map,
        draggable: true
    });




    // To add the marker to the map, call setMap();
    marker.setMap(map);

}

const enviarEmail = (contrasenna) => {
    let datos = {
        correo: document.getElementById("correo").value,
        contrasenna: contrasenna

    }
    fetch("http://localhost:5000/usuarios/send_email", {
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


const registrarCliente = () => {
    let positions = getPosition();
    let radio = radioValue();
    let contrasenna = generatePasswordRand(12, 'rand')
    let tipo_usuario = "cliente"
    let imagen_usuario = "../../img/placeholder-User.jpg"
    let idProvincia = document.getElementById("provincia").value;
    let provincia = getProvincia(idProvincia);
    let idCanton = document.getElementById("canton").value;
    let canton = getCanton(idCanton);
    let idDistrito = document.getElementById("distrito").value;
    let distrito = getDistrito(idDistrito);
    enviarEmail(contrasenna);
    var datos = {
        nombre: document.getElementById("nombre").value,
        apellido1: document.getElementById("apellido1").value,
        apellido2: document.getElementById("apellido2").value,
        correo: document.getElementById("correo").value,
        tipo_identificacion: document.getElementById("tipo_identificacion").value,
        identificacion: document.getElementById("identificacion").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        telefono: document.getElementById("telefono").value,
        genero: radio,
        cantidad_mascotas: document.getElementById("cantidad_mascotas").value,
        provincia: provincia,
        canton: canton,
        distrito: distrito,
        direccion: document.getElementById("direccion").value,
        latitud: positions.lat,
        longitud: positions.lng,
        contrasenna: contrasenna,
        tipo_usuario: tipo_usuario,
        imagen_usuario: imagen_usuario,
        promedio_calificacion: "",
        estado: "",
    }

    fetch("http://localhost:5000/usuarios/insertar", {
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

const getPosition = () => {

    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    return {
        lat, lng
    }

}


const radioValue = () => {
    let radios = document.getElementsByName('gender');
    let radio;
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radio = radios[i].value;
            return radio;
        }

    }

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


const validarUsuario = () => {
    var datos = {
        correo: document.getElementById("correo").value
    }

    fetch("http://localhost:5000/usuarios/buscar_usuario", {
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
                if (json.success == true) {
                    return true
                } else {
                    return false
                }

            }
        );
}

function generatePasswordRand(length, type) {
    switch (type) {
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'rand':
            //FOR ↓
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    let contrasenna = "";
    for (i = 0; i < length; i++) {
        if (type == 'rand') {
            contrasenna += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        } else {
            contrasenna += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }
    return contrasenna;
}


const localMascota = () => {
    let correo = document.getElementById("correo").value;
    let cantidadMascotas = document.getElementById("cantidad_mascotas").value
    let mascotas = {
        correo: correo,
        cantidadMascotas: cantidadMascotas
    }
    let jsonDatos = JSON.stringify(mascotas);

    localStorage.setItem('key-data-mascotas', jsonDatos);
}