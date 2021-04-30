

const cargarListado = () => {
  fetch('http://localhost:5000/categorias_servicios')
    .then(response => {
      return response.json();
    })
    .then(json => {
      let contListado = '';
      for (let i = 0; i < json.length; i += 4) {
        contListado += `<div class="services" data-aos="fade-right">
                      <div class="categoria">
                          <div class="img-categoria">
                              <p>${json[i].nombre}</p>
                              <img src="${json[i].imagen}" width="400" height="auto"/>
                              <div class="capa-transparente">
                                  <a href="../listadoServicios/listado_servicios.html?id=${json[i]._id}" data-nombreCategoria = "${json[i].nombre}" onclick="ver(this)" class="button-crear--cuenta">Ver</a>
                              </div>
                          </div>
                      </div>`;
        if (json[i + 1] != undefined) {
          contListado += `<div class="categoria">
                          <div class="img-categoria">
                              <p>${json[i + 1].nombre}</p>
                              <img src="${json[i + 1].imagen}" />
                              <div class="capa-transparente">
                                  <a href="../listadoServicios/listado_servicios.html?id=${json[i + 1]._id}" class="button-crear--cuenta" data-nombreCategoria = "${json[i + 1].nombre}" onclick="ver(this)">Ver</a>
                              </div>
                          </div>
                      </div>`;
        } else {
          contListado += `<div class="categoria">
                          <div class="img-categoria indefinido">
                          </div>
                      </div>`;
        }
        if (json[i + 2] != undefined) {
          contListado += `<div class="categoria">
                          <div class="img-categoria">
                              <p>${json[i + 2].nombre}</p>
                              <img src="${json[i + 2].imagen}" />
                              <div class="capa-transparente">
                                  <a href="../listadoServicios/listado_servicios.html?id=${json[i + 2]._id}" class="button-crear--cuenta" data-nombreCategoria = "${json[i + 2].nombre}" onclick="ver(this)">Ver</a>
                              </div>
                          </div>
                      </div>`;
        } else {
          contListado += `<div class="categoria">
                          <div class="img-categoria indefinido">
                          </div>
                      </div>`;
        }
        if (json[i + 3] != undefined) {
          contListado += `<div class="categoria">
                          <div class="img-categoria">
                              <p>${json[i + 3].nombre}</p>
                              <img src="${json[i + 3].imagen}" />
                              <div class="capa-transparente">
                                  <a href="../listadoServicios/listado_servicios.html?id=${json[i + 3]._id}" class="button-crear--cuenta" data-nombreCategoria = "${json[i + 3].nombre}" onclick="ver(this)">Ver</a>
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
    });
};

const buscar = () => {
  let busqueda = document.getElementById('buscar').value;
  let letrasBusqueda = busqueda.split('');
  listado = document.getElementById('listado');

  fetch('http://localhost:5000/categorias_servicios')
    .then(response => {
      return response.json();
    })
    .then(json => {
      let contListado = '';
      var esBuscado = false;
      let i = 0;
      let nombres = [];
      let imagenes = [];
      let checkNoBuscado = false;

      if (busqueda == '') {
        cargarListado();
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
            nombres.push(json[i].nombre);
            imagenes.push(json[i].imagen);
          } else {
            listado.innerHTML = '';
          }
        }

        for (let l = 0; l < nombres.length; l += 4) {
          contListado += `<div class="services" data-aos="fade-right">
                    <div class="categoria">
                        <div class="img-categoria">
                            <p>${nombres[l]}</p>
                            <img src="${imagenes[l]}" />
                            <div class="capa-transparente">
                                <a href="../listadoServicios/listado_servicios.html" class="button-crear--cuenta" data-nombreCategoria = "${nombres[l]}" onclick="ver(this)">Ver</a>
                            </div>
                        </div>
                    </div>`;
          if (nombres[l + 1] != undefined) {
            contListado += `<div class="categoria">
                        <div class="img-categoria">
                            <p>${nombres[l + 1]}</p>
                            <img src="${imagenes[l + 1]}" />
                            <div class="capa-transparente">
                                <a href="../listadoServicios/listado_servicios.html" class="button-crear--cuenta" data-nombreCategoria = "${nombres[l + 1]}" onclick="ver(this)">Ver</a>
                            </div>
                        </div>
                    </div>`;
          } else {
            contListado += `<div class="categoria">
                        <div class="img-categoria indefinido">
                        </div>
                    </div>`;
          }

          if (nombres[l + 2] != undefined) {
            contListado += `<div class="categoria">
                        <div class="img-categoria">
                            <p>${nombres[l + 2]}</p>
                            <img src="${imagenes[l + 2]}" />
                            <div class="capa-transparente">
                                <a href="../listadoServicios/listado_servicios.html" class="button-crear--cuenta" data-nombreCategoria = "${nombres[l + 2]}" onclick="ver(this)">Ver</a>
                            </div>
                        </div>
                    </div>`;
          } else {
            contListado += `<div class="categoria">
                        <div class="img-categoria indefinido">
                        </div>
                    </div>`;
          }
          if (nombres[l + 3] != undefined) {
            contListado += `<div class="categoria">
                        <div class="img-categoria">
                            <p>${nombres[l + 3]}</p>
                            <img src="${imagenes[l + 3]}" />
                            <div class="capa-transparente">
                                <a href="../listadoServicios/listado_servicios.html" class="button-crear--cuenta" data-nombreCategoria = "${nombres[l + 3]}" onclick="ver(this)">Ver</a>
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


const ver = (element) => {
    const nombre = element.getAttribute('data-nombreCategoria');
    localStorage.setItem('data-nombreCategoria', nombre);

  
}
    

const getServiceNames = data => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5000/servicios/service_names', {
      method: 'POST',
      body: JSON.stringify({data:data}),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        resolve(data);
      });
  });
};

const getPosiciones = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5000/usuarios/servicios_posiciones', {
      method: 'GET',
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        resolve(data);
      });
  });
};

// Initialize and add the map
let map;
let infoWindow;

const dropMarker = (lat, lng, title, infoWindow) => {
  let position = { lat, lng };
  let content = `<h4>${title}</h4>`;

  let marker = new google.maps.Marker({
    position: position,
    map: map,
    title: content,
  });

  
  marker.addListener('click', () => {
    infoWindow.setContent(content);
    infoWindow.open(map, marker);
  });
};

// Initialize and add the map
function initMap() {
  let lat = 9.9333;
  let lng = -84.0833;
  var myLatlng = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    zoom: 10,
    center: myLatlng,
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  infoWindow = new google.maps.InfoWindow;

  getPosiciones().then(data => {
    getServiceNames(data).then(finalData => {
        finalData.forEach(service => {
            let serviceName = service.servicio;
            let sLat = parseFloat(service.latitud);
            let sLng = parseFloat(service.longitud);
            dropMarker(sLat, sLng, serviceName, infoWindow);
          });
    });

    
  });
}

// function initMap() {
//   let lat = 9.9333;
//   let lng = -84.0833;
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 12,
//     draggable: true,
//     center: new google.maps.LatLng(lat, lng),
//   });

//   getPosiciones().then(data => {
//       console.log(data);
//     data.forEach((service, index) => {
//       let serviceName = 'Name #' + index;
//       dropMarker(service.latitud, service.longitud, serviceName);
//     });
//   });
// }
