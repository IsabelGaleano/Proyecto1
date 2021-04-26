const cargarReportes = () => {
  fetch('http://localhost:5000/usuarios/reporte_administrador').then(res => {
    res.json().then(data => {
      document.getElementById('reporte_usuarios_registrados').innerText = data.usuarios;
      document.getElementById('reporte_clientes_registrados').innerText = data.clientes;
      document.getElementById('reporte_proveedores_registrados').innerText = data.proveedores;
    })
  });

  fetch('http://localhost:5000/mascotas/cantidad_total').then(res => {
    res.json().then(data => {
      document.getElementById('reporte_mascotas_registrados').innerText = data.cantidad;
    })
  });
}

cargarReportes();

var densityCanvas = document.getElementById("densityChart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 15;

var densityData = {
  label: 'Mascotas por raza',
  data: [10, 25, 1, 30, 40, 60, 5, 20], 
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

var barChart = new Chart(densityCanvas, {
  type: 'bar',
  data: {
    labels: ["Bulldog", "Pastor Aleman", "Poodle", "Husky", "Siamés", "Ragdoll", "Maine Coon", "Persa"],
    datasets: [densityData], 
    
  }
});

var densityCanvas2 = document.getElementById("densityChart2");

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

var barChart = new Chart(densityCanvas2, {
  type: 'bar',
  data: {
    labels: ["Bienestar emocional", "Bienestar físico", "Estética", "Servicio Médico", "Servicio Funerario", "Pet Shop", "Bisutería"],
    datasets: [densityData]
  }
});