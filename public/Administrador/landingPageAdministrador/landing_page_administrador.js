const cargarReportes = () => {
  fetch('http://localhost:5000/usuarios/reporte_administrador').then(res => {
    res.json().then(data => {
      document.getElementById('reporte_usuarios_registrados').innerText =
        data.usuarios;
      document.getElementById('reporte_clientes_registrados').innerText =
        data.clientes;
      document.getElementById('reporte_proveedores_registrados').innerText =
        data.proveedores;
    });
  });

  fetch('http://localhost:5000/mascotas/cantidad_total').then(res => {
    res.json().then(data => {
      document.getElementById('reporte_mascotas_registrados').innerText =
        data.cantidad;
    });
  });
};

cargarReportes();

const cargarChartMascotasPorRaza = () => {
  fetch('http://localhost:5000/mascotas/buscar_raza')
    .then(res => {
      return res.json();
    })
    .then(data => {
      let DATA_LABEL = [];
      let DATA_AMOUNT = [];
      let DATA_BACKGROUND_COLOR = [];

      data.forEach(ele => {
        DATA_LABEL.push(ele.raza);
        DATA_AMOUNT.push(ele.cantidad);
        DATA_BACKGROUND_COLOR.push(
          '#' + Math.floor(Math.random() * 16777215).toString(16)
        );
      });

      var reporteRazas = document.getElementById('chartReporteRazas');
      new Chart(reporteRazas, {
        type: 'pie',
        data: {
          labels: DATA_LABEL,
          datasets: [
            {
              label: 'Reporte Mascotas por Raza',
              data: DATA_AMOUNT,
              backgroundColor: DATA_BACKGROUND_COLOR,
            },
          ],
        },
      });
    });
};

const cargarChartServiciosPorCategoria = () => {
  fetch('http://localhost:5000/servicios/buscar_categoria')
    .then(res => {
      return res.json();
    })
    .then(data => {
      let DATA_LABEL = [];
      let DATA_AMOUNT = [];
      let DATA_BACKGROUND_COLOR = [];

      data.forEach((ele, index) => {
        DATA_LABEL.push(ele.categoria_servicio);
        DATA_AMOUNT.push(ele.cantidad);
        DATA_BACKGROUND_COLOR.push(
          '#' + Math.floor(Math.random() * 16777215).toString(16)
        );
      });

      var reporteRazas = document.getElementById('chartReporteServicios');
      new Chart(reporteRazas, {
        type: 'doughnut',
        data: {
          labels: DATA_LABEL,
          datasets: [
            {
              label: 'Reporte Servicios por Categoría',
              data: DATA_AMOUNT,
              backgroundColor: DATA_BACKGROUND_COLOR,
            },
          ],
        },
      });
    });
};

cargarChartMascotasPorRaza();
cargarChartServiciosPorCategoria();
