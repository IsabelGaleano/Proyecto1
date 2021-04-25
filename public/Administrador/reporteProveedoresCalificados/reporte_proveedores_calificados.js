let usuariosPromedios = [];
let promediosUsuarios = [];
let EXPORT_EXCEL_DATA = [];

const cargarListado = () => {
  let tipoUsuario = 'proveedor';
  var datos = {
    tipo_usuario: tipoUsuario,
  };

  fetch('http://localhost:5000/usuarios/buscar_tipo_usuario', {
    method: 'POST',
    body: JSON.stringify(datos),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      let listado;
      for (let i = 0; i < json.length; i++) {
        if (json[i].promedio_calificacion >= 4.0) {
          usuariosPromedios[i] = json[i].nombre;
          promediosUsuarios[i] = json[i].promedio_calificacion;
        }
      }
      for (let i = 0; i < usuariosPromedios.length; i++) {
        listado = ` <tr>
                    <td>${i + 1}</td>
                    <td colspan="3">${json[i].nombre} ${json[i].apellido1} ${
          json[i].apellido2
        }</td>
                    <td><div class="estrellas">
                        <i class="fas fa-star yellow"></i>
                        <i class="fas fa-star yellow"></i>
                        <i class="fas fa-star yellow"></i>
                        <i class="fas fa-star yellow"></i>
                        <i class="fas fa-star yellow ultimate"></i>
                    </div></td>
                    <td>${json[i].promedio_calificacion}</td>
                </tr>`;

        document
          .getElementById('tabla')
          .insertAdjacentHTML('beforeend', listado);
        let elements = document.getElementsByClassName('ultimate');
        if (promediosUsuarios[i] <= 4.97) {
          elements[i].classList.remove('yellow');
          elements[i].classList.add('gray');
        }

        let excelDataJSON = {
          ranking: (i + 1).toString(),
          nombre: json[i].nombre + ' ' + json[i].apellido1,
          calificacion: json[i].promedio_calificacion.toString(),
        };
        EXPORT_EXCEL_DATA.push(excelDataJSON);
      }
    });
};

document.getElementById('descargarExcel').addEventListener('click', e => {
  exportAsExcelFile(EXPORT_EXCEL_DATA, 'reporte_ranking');
});

document.getElementById('descargarPDF').addEventListener('click', e => {
  fetch('http://localhost:5000/exportar_pdf', {
    method: 'POST',
    body: JSON.stringify({ data: EXPORT_EXCEL_DATA, filename: 'reporte_calificaciones' }),
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
