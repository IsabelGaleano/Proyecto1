const listarServicio = async (idCategoria) => {
  try {
      console.log(idCategoria);
      const { data } = await axios.get(`http://localhost:5000/servicios/categoria/${idCategoria}`);
      return data;
  } catch (e) {
      return e.message;
  }
}

const listadoServiciosHtml = (imagen, nombre, descripcion) => {
  return `
    <div class="info-listado">
      <div class="img-categoria">
        <img src="${imagen || '../img/estetica4.PNG'}" />
      </div>
      <div class="descripcion-info">
        <h4 class="margin-bottom">${nombre}</h4>
        <p class="margin-top">${descripcion}</p>
        <div class="estrellas">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      </div>

      <div class="button-ver">
        <a class="button button-aceptar" href="../contratacionServicios/contratacion_servicio.html"> Ver más</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
      // const categoria = document.getElementById('categoria_servicio');
      const idCategoria= '607381b228c8fc2b98c03970';

      const servicios = await listarServicio(idCategoria);
      console.log(servicios);
      
      for (let i = 0; i < servicios.length; i += 2) {
        const listado = `
            <div class="listado">
                ${ listadoServiciosHtml(servicios[i].imagen, servicios[i].nombre_servicio, servicios[i].descripcion) }
                ${ servicios[i + 1] ? listadoServiciosHtml(servicios[i].nombre_servicio, servicios[i].nombre, servicios[i].descripcion) : '' }
            </div>
        `;

        document.getElementById('listadoServicios').insertAdjacentHTML("beforeend", listado);
      }
  } catch (e) {
      Swal.fire({
          title: 'Error!',
          text: e.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
      });
  }
});




