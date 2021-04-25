let EXPORT_EXCEL_DATA = [];

const cargarChart = year => {
  fetch('http://localhost:5000/usuarios/buscar_tipo', {
    method: 'POST',
    body: JSON.stringify({ year: year }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      
      console.log(data);

      // --- Excel ---
      data.forEach(tipoUsuario => {
        let excelDataJSON = {
          tipo: tipoUsuario.tipo,
          enero: tipoUsuario.data[0],
          febrero: tipoUsuario.data[1],
          marzo: tipoUsuario.data[2],
          abril: tipoUsuario.data[3],
          mayo: tipoUsuario.data[4],
          junio: tipoUsuario.data[5],
          julio: tipoUsuario.data[6],
          agosto: tipoUsuario.data[7],
          septiembre: tipoUsuario.data[8],
          octubre: tipoUsuario.data[9],
          noviembre: tipoUsuario.data[10],
          diciembre: tipoUsuario.data[11],
        };
        EXPORT_EXCEL_DATA.push(excelDataJSON);
      });
      // ---------------------------------------------------------

      let DATA_CLIENTE = data[0].data;
      let DATA_PROVEEDOR = data[1].data;

      new Chart(document.getElementById('line-chart'), {
        type: 'line',
        data: {
          labels: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
          ],
          datasets: [
            {
              data: DATA_CLIENTE,
              label: 'Clientes',
              borderColor: '#3e95cd',
              fill: false,
            },
            {
              data: DATA_PROVEEDOR,
              label: 'Proveedores',
              borderColor: '#8e5ea2',
              fill: false,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: 'Reporte de usuarios registrados',
          },
        },
      });
    });
};

const cargarChartMinYear = () => {
  fetch('http://localhost:5000/usuarios/buscar_tipo_min_year')
    .then(res => {
      return res.json();
    })
    .then(data => {
      const MIN_YEAR = data.minYear;

      cargarSelect(MIN_YEAR);
    });
};

const cargarSelect = data => {
  let select_year = document.getElementById('select_year');
  select_year.innerHTML = '';
  for (let year = data; year <= new Date().getFullYear(); year++) {
    let option = `<option value='${year}' ${
      year === new Date().getFullYear() && 'selected'
    }>${year}</option>`;
    select_year.innerHTML += option;
  }
};

cargarChartMinYear();
cargarChart(new Date().getFullYear());

document.getElementById('select_year').addEventListener('change', e => {
  cargarChart(Number.parseInt(e.target.value));
});

document.getElementById('descargarExcel').addEventListener('click', e => {
  exportAsExcelFile(EXPORT_EXCEL_DATA, 'reporte_ranking');
});
