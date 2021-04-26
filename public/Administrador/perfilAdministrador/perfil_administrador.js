const cargarPerfil = () => {
    let tipo_usuario = "administrador";
    var correoLocal = localStorage.getItem('correo');
    var datos = {
        correo: correoLocal
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
          
          for (let i = 0; i < json.length; i++) {
            let nombre = `${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2}`
            document.getElementById('correo').innerText = json[i].correo;
            document.getElementById('telefono').innerText = json[i].telefono;
            document.getElementById('nombre').innerText = nombre;
          
            
          }
        
        }
      )
      .catch(
        function(err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    );
  }
  
  
  
  