const cargarListado = () => {
    

    fetch("http://localhost:5000/categorias_mascotas")
       
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
                let listado;

                for (let i = 0; i < json.length; i+=2) {

                    if (json[i+1] !== undefined) {
                        
                        listado = `<div class="listado">
                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="${json[i].imagen}" />
                        </div> 
                        <div class="descripcion-info">
                            <h5 class="titulo-categoria">${json[i].nombre}</h5>
                        </div>
                        <div class="button-accion">
                            <a href="../perfilClienteAdmi/perfil_cliente_admi.html"><i class="far fa-eye"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#"><i class="fas fa-user-times"></i></i></a>
                        </div>
                    </div>

                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="${json[i+1].imagen}" />
                        </div>
                        <div class="descripcion-info">
                            <h5 class="titulo-categoria">${json[i+1].nombre}</h5>
                        </div>
                        <div class="button-accion">
                            <a href="../perfilClienteAdmi/perfil_cliente_admi.html"><i class="far fa-eye"></i></a>
                        </div>
                        <div class="button-accion">
                            <a href="#"><i class="fas fa-user-times"></i></i></a>
                        </div>
                    </div>
                </div>`;
                      

                    } else {
                        listado = `<div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="${json[i].imagen}" />
                            </div>
                            <div class="descripcion-info">
                                <h5 class="titulo-categoria">${json[i].nombre}</h5>
                            </div>
                            <div class="button-accion">
                                <a href="../perfilClienteAdmi/perfil_cliente_admi.html"><i class="far fa-eye"></i></a>
                            </div>
                            <div class="button-accion">
                                <a href="#"><i class="fas fa-user-times"></i></i></a>
                            </div>
                        </div>
                    </div>`


                    }


                    document.getElementById('listado').insertAdjacentHTML("beforeend", listado);

                }
            }
        )
}