

var reporteProveedores = document.getElementById("reporteProveedores");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 15;

var densityData = {
  label: 'Provedores por categorías de servicios',
  data: [50, 10, 5, 2, 10, 20, 5, 4], 
  backgroundColor: [
    'rgba(0, 99, 132, 0.6)',
    'rgba(30, 99, 132, 0.6)',
    'rgba(60, 99, 132, 0.6)',
    'rgba(90, 99, 132, 0.6)',
    'rgba(120, 99, 132, 0.6)',
    'rgba(150, 99, 132, 0.6)',
    'rgba(180, 99, 132, 0.6)',
    'rgba(210, 99, 132, 0.6)',
    'rgba(240, 99, 132, 0.6)'
  ],
  borderColor: [
    'rgba(0, 99, 132, 1)',
    'rgba(30, 99, 132, 1)',
    'rgba(60, 99, 132, 1)',
    'rgba(90, 99, 132, 1)',
    'rgba(120, 99, 132, 1)',
    'rgba(150, 99, 132, 1)',
    'rgba(180, 99, 132, 1)',
    'rgba(210, 99, 132, 1)',
    'rgba(240, 99, 132, 1)'
  ],
};

var barChart = new Chart(reporteProveedores, {
  type: 'bar',
  data: {
    labels: ["Bienestar emocional", "Bienestar físico", "Estética", "Servicio Médico", "Servicio Funerario", "Pet Shop", "Bisutería"],
    datasets: [densityData]
  }
});