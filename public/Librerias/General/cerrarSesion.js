const cerrarSesion = () => {
    localStorage.clear();
    window.location.href = `${location.origin}/General/login/login.html`;
}

document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesionBtn = document.getElementById('cerrarSesion')
    cerrarSesionBtn.addEventListener('click', cerrarSesion);
});

