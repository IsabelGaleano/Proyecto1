let contador = 0;
document.querySelector('#revisarMascota').addEventListener('click', e => {
    let revisar = document.getElementById("revisarMascota");
    let error = revisarForm();
    if (!error) {
        Swal.fire({
            title: 'Éxito!',
            text: 'Registro éxitoso, revise su correo',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
        registroMascotas();

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});

const registroMascotas = () => {
    var mascotaJSON = localStorage.getItem("key-data-mascotas");
    var mascota = JSON.parse(mascotaJSON);
    let cantidad = mascota.cantidadMascotas;
    let revisar = document.getElementById("revisarMascota");
    if (contador < cantidad) {
        insertarInfo();
        document.getElementById('nombre').value = "";
        document.getElementById('categoriaMascota').value = "";
        document.getElementById('raza').value = "";
        resetPadecimientos();
        resetVacunas();
        document.getElementById('foto_mascota').value = "";
        document.getElementById('caracteristicas').value = "";
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Su mascota se ha registrado',
            showConfirmButton: false,
            timer: 1500
        })
        contador++;
        if (contador == cantidad) {
            revisar.setAttribute("href", "../../General/login/login.html");
        }
       
    } 
}


const insertarInfo = () => {
    var mascotaJSON = localStorage.getItem("key-data-mascotas");
    var mascota = JSON.parse(mascotaJSON);
    var infoMascota = {
        duenno: mascota.correo,
        nombre: document.getElementById("nombre").value,
        tipo: document.getElementById("categoriaMascota").value,
        raza: document.getElementById("raza").value,
        padecimientos: obtenerPadecimientos(),
        vacunas: obtenerVacunas(),
        foto_mascota: document.getElementById("foto_mascota").value,
        caracteristicas: document.getElementById("caracteristicas").value,
    }

    fetch("http://localhost:5000/mascotas/insertar", {
        method: 'POST',
        body: JSON.stringify(infoMascota),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            respuesta => {
                return respuesta.json();
            }
        );
}

const cargarVacunas = () => {
    fetch("http://localhost:5000/vacunas")
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                let listado;
                for (let i = 0; i < json.length; i++) {
                    listado = ` <p><input type="checkbox" value="${json[i].nombre}" class = "checkVacunas"> ${json[i].nombre}</p>`
                    document.getElementById("vacunas").insertAdjacentHTML("beforeend", listado);
                }
            }
        )

}



const cargarPadecimientos = () => {
    fetch("http://localhost:5000/padecimientos/")
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                let listado;
                for (let i = 0; i < json.length; i++) {
                    listado = `<p><input type="checkbox" class = "checkPadecimientos" value="${json[i].nombre}">${json[i].nombre}</p>`
                    document.getElementById("padecimientos").insertAdjacentHTML("beforeend", listado);
                }
            }
        )

}


const cargarCategoriasMascotas = () => {
    fetch("http://localhost:5000/categorias_mascotas/")
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                let listado;
                for (let i = 0; i < json.length; i++) {
                    listado = ` <option value="${json[i].nombre}">${json[i].nombre}</option>`
                    document.getElementById("categoriaMascota").insertAdjacentHTML("beforeend", listado);
                }
            }
        )

}


const cargarRazas = () => {
    fetch("http://localhost:5000/razas/")
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                let listado;
                for (let i = 0; i < json.length; i++) {
                    listado = `<option value="${json[i].nombre}">${json[i].nombre}</option>`
                    document.getElementById("raza").insertAdjacentHTML("beforeend", listado);
                }
            }
        )

}


window.addEventListener('load', e => {
    cargarVacunas();
    cargarPadecimientos();
    cargarCategoriasMascotas();
    cargarRazas();
})


const obtenerVacunas = () => {
    let vacunas = [];
    var inputElements = document.getElementsByClassName('checkVacunas');
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i].checked) {
            vacunas.push(inputElements[i].value);

        }
    }

    return vacunas;
}



const obtenerPadecimientos = () => {
    let padecimientos = [];
    var inputElements = document.getElementsByClassName('checkPadecimientos');
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i].checked) {
            padecimientos.push(inputElements[i].value);

        }
    }

    return padecimientos;
}




const resetPadecimientos = () => {
    var inputElements = document.getElementsByClassName('checkPadecimientos');
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i].checked) {
            inputElements[i].checked = false;

        }
    }


}

const resetVacunas = () => {
    var inputElements = document.getElementsByClassName('checkVacunas');
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i].checked) {
            inputElements[i].checked = false;
        }
    }

}




const radioValue = () => {
    let radios = document.getElementsByName('vacunas');
    let radio;
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radio = radios[i].value;
            return radio;
        }

    }

}