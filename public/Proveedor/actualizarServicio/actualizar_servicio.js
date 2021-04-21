var swiper = new Swiper(".swiper-container", {
  speed: 1500,
  loop: true,
  // autoplay: {
  //     delay: 500
  // },
  plugins: [SwiperPluginAutoPlay]
});

document.querySelector('#revisarServicio').addEventListener('click', e => {
  let revisar = document.getElementById("revisarServicio");
  let error = revisarForm();
  if (!error) {

    revisar.setAttribute("href", "../perfilProveedor/perfil_proveedor.html")


  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Campos vacíos',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })

  }


})