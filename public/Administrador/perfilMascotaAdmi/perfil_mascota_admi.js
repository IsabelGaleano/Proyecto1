
const cargarPerfil = () => {
  var mascotaJSONFromLS = localStorage.getItem("mascotaClienteA");
  var mascota = JSON.parse(mascotaJSONFromLS);
  var datos = {
    nombre: mascota.nombreMascota,
    duenno: mascota.duenno
  }

  console.log(datos)

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
        //let vacunas = [];
        //let padecimientos = [];
        console.log(json)
        for (let i = 0; i < json.length ; i++) {
          //vacunas[i] = json[i].vacunas;
          //padecimientos[i].json[i].padecimientos;
          document.getElementById('nombre').innerText = json[i].nombre;
          document.getElementById('raza').innerText = json[i].raza;
          document.getElementById('tipo').innerText = json[i].tipo;
          document.getElementById('caracteristicas').innerText = json[i].caracteristicas;
         
        }
        resetVacunas(vacunas);

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
          listado = ` <p><input type="checkbox" value="${json[i].nombre}" class = "checkVacunas" disabled> ${json[i].nombre}</p>`
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
          listado = `<p><input type="checkbox" class = "checkPadecimientos" value="${json[i].nombre}" disabled>${json[i].nombre}</p>`
          document.getElementById("padecimientos").insertAdjacentHTML("beforeend", listado);
        }
      }
    )

}


const resetVacunas = (vacunas) => {
  var inputElements = document.getElementsByClassName('checkVacunas');
  for (let i = 0; i < inputElements.length; ++i) {
    if (inputElements[i].value = vacunas[i]) {
      inputElements[i].checked = true;
    }
  }

}

window.addEventListener('load', e => {
  cargarVacunas();
  cargarPadecimientos();
})
