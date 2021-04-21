new Chart(document.getElementById("pie-chart"), {
  type: 'pie',
  data: {
    labels: ["Gatos", "Perros"],
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#3e95cd", "#8e5ea2"],
      data: [478,267]
    }]
  },
  options: {
    title: {
      display: true,
      text: 'Reporte de Mascotas por tipo'
    }
  }
});