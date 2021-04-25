let EXPORT_EXCEL_DATA = [];

const cargarChart = () => {
  fetch('http://localhost:5000/mascotas/buscar_raza')
    .then(res => {
      return res.json();
    })
    .then(data => {
      let DATA_LABEL = [];
      let DATA_AMOUNT = [];
      let DATA_BACKGROUND_COLOR = [];

      data.forEach((ele, index) => {
        // --- Excel ---
        let excelDataJSON = {
          ranking: (index + 1).toString(),
          raza: ele.raza,
          cantidad: ele.cantidad.toString(),
        };
        EXPORT_EXCEL_DATA.push(excelDataJSON);
        // ---------------------------------------------------------

        DATA_LABEL.push(ele.raza);
        DATA_AMOUNT.push(ele.cantidad);
        DATA_BACKGROUND_COLOR.push(
          '#' + Math.floor(Math.random() * 16777215).toString(16)
        );
      });

      var reporteRazas = document.getElementById('reporteRazas');
      new Chart(reporteRazas, {
        type: 'doughnut',
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

document.getElementById('descargarPDF').addEventListener('click', e => {
  fetch('http://localhost:5000/exportar_pdf', {
    method: 'POST',
    body: JSON.stringify({
      data: EXPORT_EXCEL_DATA,
      filename: 'reporte_mascotas_raza',
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);

      fetch(
        'http://localhost:5000/exportar_pdf/download_pdf/' + json.filename,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/pdf' },
        }
      ).then(data => {
        window.open(data.url, '_blank');
      });
    });
});

document.getElementById('descargarExcel').addEventListener('click', e => {
  exportAsExcelFile(EXPORT_EXCEL_DATA, 'reporte_mascotas_tipo');
});

cargarChart();
