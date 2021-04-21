new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478, 1000, 100],
        label: "Clientes",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: [282,350,411,502,635,809,947,1402,3700,5267, 100, 200],
        label: "Proveedores",
        borderColor: "#8e5ea2",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Reporte de usuarios registrados'
    }
  }
});