
const cargarListado = () => {
    fetch("http://localhost:5000/razas/", {
        method: 'GET'
    })
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                let listado;
                for (let i = 0; i < json.length; i += 2) {


                    if (json[i + 1] !== undefined) {

                        listado = `<div class="listado">
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${json[i].imagen}" />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="titulo-categoria">${json[i].nombre}</h4>
                                    <p>Tipo: ${json[i + 1].categoria}</p>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarRaza/actualizar_raza.html"><i class="fas fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#"><i class="fas fa-trash"></i></a>
                                </div>
                            </div>
                            <div class="info-listado">
                                <div class="img-categoria">
                                    <img src="${json[i + 1].imagen}" />
                                </div>
                                <div class="descripcion-info">
                                    <h4 class="titulo-categoria">${json[i + 1].nombre}</h4>
                                    <p>Tipo: ${json[i + 1].categoria}</p>
                                </div>
                                <div class="button-accion">
                                    <a href="../actualizarRaza/actualizar_raza.html"><i class="fas fa-edit"></i></a>
                                </div>
                                <div class="button-accion">
                                    <a href="#"><i class="fas fa-trash"></i></a>
                                </div>
                            </div>
                        </div>`;

                    } else {
                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagen}" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="titulo-categoria">${json[i].nombre}</h4>
                                <p>Tipo: ${json[i].categoria}</p>
                            </div>
                            <div class="button-accion">
                                <a href="../actualizarRaza/actualizar_raza.html"><i class="fas fa-edit"></i></a>
                            </div>
                            <div class="button-accion">
                                <a href="#"><i class="fas fa-trash"></i></a>
                            </div>
                        </div>
            
                    </div>`


                    }


                    document.getElementById('listado').insertAdjacentHTML("beforeend", listado);

                }
            }
        )
}



