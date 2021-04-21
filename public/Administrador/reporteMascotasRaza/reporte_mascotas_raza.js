
var reporteRazas = document.getElementById("reporteRazas");
var barChart = new Chart(reporteRazas, {
  type: 'bar',
  data: {
    labels: ["Bulldog", "Pastor Aleman", "Poodle", "Husky", "Siamés", "Ragdoll", "Maine Coon", "Persa"],
    datasets: [{
      label: 'Reporte Mascotas por Raza',
      data: [10, 25, 1, 30, 40, 60, 5, 20],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ]
    }]
  }
});