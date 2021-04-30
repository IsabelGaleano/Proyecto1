const listarServicio = async (idCategoria) => {
  try {
      console.log(idCategoria);
      const { data } = await axios.get(`http://localhost:5000/servicios/categoria/${idCategoria}`);
      return data;
  } catch (e) {
      return e.message;
  }
}

const listadoServiciosHtml = (imagen, nombre, descripcion, proveedor, imagenes_servicio) => {
  return `
    <div class="info-listado">
      <div class="img-categoria">
        <img src="${imagenes_servicio[0]}" />
      </div>
      <div class="descripcion-info">
        <h4 class="margin-bottom">${nombre}</h4>
        <div class="estrellasp">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      </div>

      <div class="button-ver">
        <a class="button button-aceptar" href="../contratacionServicios/contratacion_servicio.html" data-proveedorC = "${proveedor}" onclick="ver(this)"> Ver más</a>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
      // const categoria = document.getElementById('categoria_servicio');
      // 6086ebb2e408fa30d8222cdb
      const urlParams = new URLSearchParams(window.location.search);
      const idCategoria = urlParams.get('id');
      const servicios = await listarServicio(idCategoria);
      console.log(servicios);
      
      for (let i = 0; i < servicios.length; i += 2) {
        const listado = `
            <div class="listado">
                ${ listadoServiciosHtml(servicios[i].imagen, servicios[i].nombre_servicio, servicios[i].descripcion, servicios[i].proveedor, servicios[i].imagenes_servicio) }
                ${ servicios[i + 1] ? listadoServiciosHtml(servicios[i + 1].imagen, servicios[i + 1].nombre_servicio, servicios[i + 1].descripcion, servicios[i + 1].proveedor, servicios[i + 1].imagenes_servicio) : '' }
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


const ver = (element) => {
  const proveedor = element.getAttribute('data-proveedorC');
  localStorage.setItem('data-proveedorC', proveedor);

}

const cargarNombreCategoria = () => {
    let nombre =  localStorage.getItem('data-nombreCategoria');
    document.getElementById('nombreCategoria').innerText = nombre;
}


