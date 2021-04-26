var marker;
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
                    registrarProveedor();
                    registrarServicio();
                    revisar.setAttribute("href", "../../General/login/login.html")

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


});



const registrarProveedor = () => {
    let tipo_usuario = "proveedor"
    let imagen_usuario = "../../img/placeholder-User.jpg"
    let idProvincia = document.getElementById("provincia").value;
    let provincia = getProvincia(idProvincia);
    let idCanton = document.getElementById("canton").value;
    let canton = getCanton(idCanton);
    let idDistrito = document.getElementById("distrito").value;
    let distrito = getDistrito(idDistrito);
    var datos = {
        nombre: document.getElementById("nombre").value,
        apellido1: document.getElementById("apellido1").value,
        apellido2: document.getElementById("apellido2").value,
        correo: document.getElementById("correo").value,
        tipo_identificacion: document.getElementById("tipo_identificacion").value,
        identificacion: document.getElementById("identificacion").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        telefono: "",
        genero: "",
        cantidad_mascotas: "",
        provincia: provincia,
        canton: canton,
        distrito: distrito,
        direccion: "",
        latitud: "",
        longitud: "",
        contrasenna: "",
        tipo_usuario: tipo_usuario,
        imagen_usuario: imagen_usuario,
        promedio_calificacion: "",
        estado: "pendiente"
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


const getPosition = () => {

    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    return {
        lat, lng
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


const registrarServicio = () => {
    let positions = getPosition();
    var datos = {
        proveedor: document.getElementById("correo").value,
        nombre_servicio: document.getElementById("nombreServicio").value,
        latitud: positions.lat,
        longitud: positions.lng,
        direccion: document.getElementById("direccion").value,
        nivel_servicio: "",
        descripcion: "",
        costo: "",
        dias_servicio: "",
        horario_servicio: "",
        imagenes_servicio: "",
        whatsapp: "",
        instagram: "",
        facebook: "",
        categoria_servicio: "",
    }
    console.log(datos)
    fetch("http://localhost:5000/servicios/insertar", {
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

