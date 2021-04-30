document.querySelector('#revisarMascota').addEventListener('click', e => {
    let revisar = document.getElementById("revisarMascota");
    let error = revisarForm();
    if (!error) {

        actualizarMascota();
        revisar.setAttribute("href", "../perfilMascota/perfil_mascota.html")


    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }


});



const actualizarMascota = () => {
    let duenno = localStorage.getItem('correo');
    var infoMascota = {
        duenno: duenno,
        nombre: document.getElementById("nombre").value,
        tipo: document.getElementById("categoriaMascota").value,
        raza: document.getElementById("raza").value,
        padecimientos: obtenerPadecimientos(),
        vacunas: obtenerVacunas(),
        foto_mascota: document.getElementById("imagenMascota").src,
        caracteristicas: document.getElementById("caracteristicas").value,
        vacunaDia: radioValue()
    }

    fetch("http://localhost:5000/mascotas/actualizar_mascotas", {
        method: 'PUT',
        body: JSON.stringify(infoMascota),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            respuesta => {
                return respuesta.json();
            }
        );
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


const cargarPerfil = () => {
    let duenno = localStorage.getItem('correo');
    let nombre = localStorage.getItem('nombreMascotaAc');
    var datos = {
        nombre: nombre,
        duenno: duenno
    }

    fetch("http://localhost:5000/mascotas/buscar_mascotas_duenno/", {
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
                for (let i = 0; json.length > i; i++) {
                    document.getElementById('nombre').value = json[i].nombre;
                    setRazas(json[i].raza);
                    setCategorias(json[i].tipo);
                    buscarValorVacuna(json[i].vacunaDia);
                    document.getElementById('imagenMascota').src = json[i]?.foto_mascota
                        ? json[i].foto_mascota
                        : '../../img/placeholderPets.jpg';
                    document.getElementById('caracteristicas').value = json[i].caracteristicas;
                    //resetPadecimientos(json[i].padecimientos);
                    //resetVacunas(json[i].vacunas);

                }


            }
        )
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



const setRazas = raza => {
    var select = document.getElementById("raza");
    for (let i = 1; i < select.length; i++) {
        if (select.options[i].text == raza) {

            select.selectedIndex = i;

        }
    }
}


const setCategorias = categoria => {
    var select = document.getElementById("categoriaMascota");
    for (let i = 1; i < select.length; i++) {
        if (select.options[i].text == categoria) {

            select.selectedIndex = i;

        }
    }
}



const buscarValorVacuna = valorVacuna => {
    let si = document.getElementById('si');
    let no = document.getElementById('no');

    if (si.value === valorVacuna) {
        si.checked = true;
    } else if (no.value === valorVacuna) {
        si.checked = true;
    } else {
        no.checked = true;
    }

}

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



const resetPadecimientos = padecimientos => {
    var inputElements = document.getElementsByClassName('checkPadecimientos').value;
    console.log(inputElements)
    console.log(padecimientos)
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i] == padecimientos[i]) {
            inputElements[i].checked = true;

        }
    }


}

const resetVacunas = vacunas => {
    var inputElements = document.getElementsByClassName('checkVacunas').value;
    console.log(vacunas)
    for (let i = 0; i < inputElements.length; ++i) {
        if (inputElements[i] == vacunas[i]) {
            inputElements[i].checked = true;
        }
    }

}


const imgPreview = async (e) => {
    try {
        const img = e.files[0];
  
        if (img) {
            const base64Img = await toBase64(img);
            document.getElementById('imagenMascota').src = base64Img;
        }
    } catch (e) {
        throw e;
    }
  };
  

