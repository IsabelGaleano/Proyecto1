const LOGGED_USER_EMAIL = localStorage.getItem('correo');

const element_img = document.getElementById('logged_user_img');
const element_name = document.getElementById('logged_user_name');

fetch('http://localhost:5000/usuarios/buscar', {
  method: 'POST',
  body: JSON.stringify({ correo: LOGGED_USER_EMAIL }),
  headers: { 'Content-Type': 'application/json' },
})
  .then(res => res.json())
  .then(data => {
    element_img.src = data[0].imagen_usuario;
    element_name.innerText = data[0].nombre;
  });
