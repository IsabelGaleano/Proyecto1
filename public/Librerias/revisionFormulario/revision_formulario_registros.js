
function revisarForm() {
    let elements = document.getElementsByClassName("form-validate");
    let error = false;

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i].value;
        elements[i].addEventListener('keyup', e => {
            e.target.classList.remove('pw-form--error');
        });

        if (element.trim() == "") {
            error = true;
            elements[i].classList.add('pw-form--error');

        }
    }

    return error;


}

function calcularEdad() {
    let fechaNacimiento = document.getElementById("fecha_nacimiento");
    let hoy = new Date();
    let cumpleanos = new Date(fechaNacimiento.value);
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}


function validarEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getCardType(number) {
    
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    let valido = false;

    if (visaRegEx.test(number)) {
        valido = true;
    } else if (mastercardRegEx.test(number)) {
        valido = true;
    } else if (amexpRegEx.test(number)){
        valido = true;

    } else {
        valido = false;
    }

    return valido;


    
}


function getCedula(cedula, tipo) {

    const fisicaRegex = /^[1-9]{1}[0-9]{8}$/;
    const juridicaRegex = /^[1-9]{1}[0-9]{9}$/;
    const dimexRegex = /^[1-9]{1}[0-9]{10,11}$/;
    let validoCedula = false;

    if(tipo == 'Cédula Jurídica') {
        if (juridicaRegex.test(cedula)) {
            validoCedula = true;
        }

    } else if(tipo == 'Cédula Física') {
        if (fisicaRegex.test(cedula)) {
            validoCedula = true;
        }
    } else if (tipo == 'DIMEX') {
        if (dimexRegex.test(cedula)) {
            validoCedula = true;
        }
    } else {
        validoCedula = false;
    }

    return validoCedula;

}


function cargarProvincias() {

    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then(res => res.json())
        .then(data => {
            Object.entries(data).forEach(([key, value]) => {
                let linea = "<option value='" + key + "'>" + value + "</option>";
                document.getElementById("provincia").insertAdjacentHTML('beforeend', linea)

            });
        });

}


function cargarCanton() {
    let provincia= document.getElementById('provincia').value;
    let url = "https://ubicaciones.paginasweb.cr/provincia/"+provincia+"/cantones.json";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            Object.entries(data).forEach(([key, value]) => {
                let linea = "<option value='" + key + "'>" + value + "</option>";
                document.getElementById("canton").insertAdjacentHTML('beforeend', linea)

            });
        });


}


function cargarDistrito() {
    let provincia= document.getElementById('provincia').value;
    let canton = document.getElementById('canton').value;
   
    let url = "https://ubicaciones.paginasweb.cr/provincia/" + provincia + "/canton/" +canton+"/distritos.json"
    fetch(url)
        .then(res => res.json())
        .then(data => {
            Object.entries(data).forEach(([key, value]) => {
                let linea = "<option value='" + key + "'>" + value + "</option>";
                document.getElementById("distrito").insertAdjacentHTML('beforeend', linea)

            });
        });

}

