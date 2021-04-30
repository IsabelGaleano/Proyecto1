

  AOS.init();


  const cargarReportes = () => {
    fetch('http://localhost:5000/usuarios/reporte_administrador').then(res => {
      res.json().then(data => {
        document.getElementById('reporte_clientes_registrados').innerText =
          data.clientes;
        document.getElementById('reporte_proveedores_registrados').innerText =
          data.proveedores;
      });
    });

  };

  cargarReportes();
  