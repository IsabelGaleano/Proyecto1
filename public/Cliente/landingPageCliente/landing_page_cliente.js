
var swiper = new Swiper(".swiper-container", {
  speed: 1500,
  loop: true,
  // autoplay: {
  //     delay: 500
  // },
  plugins: [SwiperPluginAutoPlay]
});

const cargarListado = () => {
  
  fetch("http://localhost:5000/categorias_servicios")
     
      .then(
          response => {
              return response.json();
          }
      )
      .then(
          json => {
            console.log(json);
              let contListado = "";
              for (let i = 0; i < json.length; i+=4) {
                      contListado += `<div class="services" data-aos="fade-right">
                      <div class="categoria">
                          <div class="img-categoria">
                              <p>${json[i].nombre}</p>
                              <img src="./../../uploads/${json[i].imagen}" width="400" height="auto"/>
                              <div class="capa-transparente">
                                  <a href="../listadoServicios/listado_servicios.html?id=${json[i]._id}" class="button-crear--cuenta">Ver</a>
                              </div>
                          </div>
                      </div>`;
                  if (json[i+1] != undefined) {
                      contListado += `<div class="categoria">
                          <div class="img-categoria">
                              <p>${json[i+1].nombre}</p>
                              <img src="${json[i+1].imagen}" />
                              <div class="capa-transparente">
                                  <a href="../listadoServicios/listado_servicios.html?id=${json[i + 1]._id}" class="button-crear--cuenta">Ver</a>
                              </div>
                          </div>
                      </div>`;
                  } else {
                    contListado += `<div class="categoria">
                          <div class="img-categoria indefinido">
                          </div>
                      </div>`;
                  }
                  if (json[i+2] != undefined) {
                    contListado += `<div class="categoria">
                          <div class="img-categoria">
                              <p>${json[i+2].nombre}</p>
                              <img src="${json[i+2].imagen}" />
                              <div class="capa-transparente">
                                  <a href="../listadoServicios/listado_servicios.html?id=${json[i + 2]._id}" class="button-crear--cuenta">Ver</a>
                              </div>
                          </div>
                      </div>`;
                  } else {
                    contListado += `<div class="categoria">
                          <div class="img-categoria indefinido">
                          </div>
                      </div>`;
                  }
                      if (json[i+3] != undefined) {
                        contListado += `<div class="categoria">
                          <div class="img-categoria">
                              <p>${json[i+3].nombre}</p>
                              <img src="${json[i+3].imagen}" />
                              <div class="capa-transparente">
                                  <a href="../listadoServicios/listado_servicios.html?id=${json[i + 3]._id}" class="button-crear--cuenta">Ver</a>
                              </div>
                          </div>
                      </div>`;
                      } else {
                        contListado += `<div class="categoria">
                              <div class="img-categoria indefinido">
                              </div>
                          </div>`;
                      }
                      contListado += `</div>`;
                    

                  

                  document.getElementById('listado').innerHTML = contListado;
              }
          }
      )
}


const buscar = () => {
  let busqueda = document.getElementById('buscar').value;
  let letrasBusqueda = busqueda.split('');
  listado = document.getElementById('listado');

  fetch("http://localhost:5000/categorias_servicios")
     
      .then(
          response => {
              return response.json();
          }
      )
      .then(
          json => {
              let contListado ="";
              var esBuscado = false;
              let i = 0;
              let nombres = [];
              let imagenes = [];
              let checkNoBuscado = false;
              
              if (busqueda == "") {
                  cargarListado()
              } else {
                  for (i = 0; i < json.length; i++) {
                          let letrasNombre = json[i].nombre.split('');
                          checkNoBuscado = false;

                          for (let j = 0; j < busqueda.length; j++) {
                              if (!checkNoBuscado) {
                                  if (letrasNombre[j] == letrasBusqueda[j]) {
                                      esBuscado = true;
                                  } else {
                                      esBuscado = false;
                                      checkNoBuscado = true;
                                  }
                              }
                          }
                          
                      if (esBuscado) {
                          
                          nombres.push(json[i].nombre)
                          imagenes.push(json[i].imagen)
                          
                      } else {
                          listado.innerHTML = "";
                      }
                  }

                   
                  for (let l = 0; l < nombres.length; l+=4) {
                    contListado += `<div class="services" data-aos="fade-right">
                    <div class="categoria">
                        <div class="img-categoria">
                            <p>${nombres[l]}</p>
                            <img src="${imagenes[l]}" />
                            <div class="capa-transparente">
                                <a href="../listadoServicios/listado_servicios.html" class="button-crear--cuenta">Ver</a>
                            </div>
                        </div>
                    </div>`;
                if (nombres[l+1] != undefined) {
                    contListado += `<div class="categoria">
                        <div class="img-categoria">
                            <p>${nombres[l+1]}</p>
                            <img src="${imagenes[l+1]}" />
                            <div class="capa-transparente">
                                <a href="../listadoServicios/listado_servicios.html" class="button-crear--cuenta">Ver</a>
                            </div>
                        </div>
                    </div>`;
                } else {
                  contListado += `<div class="categoria">
                        <div class="img-categoria indefinido">
                        </div>
                    </div>`;
                } 
                
                if (nombres[l+2] != undefined) {
                  contListado += `<div class="categoria">
                        <div class="img-categoria">
                            <p>${nombres[l+2]}</p>
                            <img src="${imagenes[l+2]}" />
                            <div class="capa-transparente">
                                <a href="../listadoServicios/listado_servicios.html" class="button-crear--cuenta">Ver</a>
                            </div>
                        </div>
                    </div>`;
                } else {
                  contListado += `<div class="categoria">
                        <div class="img-categoria indefinido">
                        </div>
                    </div>`;
                }
                    if (nombres[l+3] != undefined) {
                      contListado += `<div class="categoria">
                        <div class="img-categoria">
                            <p>${nombres[l+3]}</p>
                            <img src="${imagenes[l+3]}" />
                            <div class="capa-transparente">
                                <a href="../listadoServicios/listado_servicios.html" class="button-crear--cuenta">Ver</a>
                            </div>
                        </div>
                    </div>`;
                    } else {
                      contListado += `<div class="categoria">
                            <div class="img-categoria indefinido">
                            </div>
                        </div>`;
                    }
                    contListado += `</div>`;
                  

                

                document.getElementById('listado').innerHTML = contListado;
            }
                  
                  listado.innerHTML = contListado;
              }
          }
      )
}