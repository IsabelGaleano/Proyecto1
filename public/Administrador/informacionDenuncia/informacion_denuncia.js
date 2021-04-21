

const cargarDenuncia = () => {
    var dataJSON = localStorage.getItem('data-denuncia');
    var personData = JSON.parse(dataJSON);
    console.log(personData);
    let correo = personData.persona;
    let motivo = personData.motivo;
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
              
                for (let i = 0; json.length > i; i++) {
                    document.getElementById('nombre').innerText = json[i].nombre;
                    document.getElementById('apellido1').innerText = json[i].apellido1;
                    document.getElementById('apellido2').innerText = json[i].apellido2;
                    document.getElementById('correo').innerText = json[i].correo;
                    document.getElementById('tipo_usuario').innerText = json[i].tipo_usuario;
                    document.getElementById('motivo').innerText = motivo;
                    

                }


            }
        )
}




