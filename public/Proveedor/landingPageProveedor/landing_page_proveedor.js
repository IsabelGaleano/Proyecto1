

  const cargarInfoProveedorPerfil = () => {
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
          let nombrePerfil;
          for (let i = 0; json.length > i; i++) {
            nombrePerfil = `${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}`;
            document.getElementById('nombre').innerText = nombrePerfil;
            document.getElementById('imagenUsuario').src = json[i].imagen_usuario
          }
        }
      )
  }