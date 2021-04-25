<<<<<<< HEAD
const cargarListadoUsuario = () => {
    let proveedor = localStorage.getItem('correo');
    var datos = {
        tipo: "proveedor",
=======

const cargarListadoUsuario = () => {
    let proveedor = localStorage.getItem('correo');
    var datos = {
        tipo: "cliente",
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
        proveedor: proveedor,
        estado: "curso"
    }

    fetch("http://localhost:5000/solicitudes/buscar_solicitudes_pendientes_proveedor", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            json => {
<<<<<<< HEAD
=======
                console.log(json);
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
                let correo = [];
                let fechas = [];
                for (let i = 0; i < json.length; i++) {

<<<<<<< HEAD
                    correo[i] = json[i].cliente;
                    fechas[i] = json[i].fecha;
                }
                cargarListado(correo, fechas);
         
=======
                    correo[i] = json[i].proveedor;
                    fechas[i] = json[i].fecha;
                }

                cargarListado(correo, fechas);
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
            }
        )
}


const cargarListado = (correo, fechas) => {
<<<<<<< HEAD

    let datos = {
        correo: correo
    }

    fetch("http://localhost:5000/usuarios/buscar_usuarios_solicitudes",
=======
    let datos = {
        proveedor: correo
    }

    fetch("http://localhost:5000/servicios/buscar_servicio_solicitudes",
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
        {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(
            response => {

                return response.json();

            }

        )
        .then(
            json => {
<<<<<<< HEAD
                console.log(json)
                let listado;
                for (let i = 0; i < json.length; i += 2) {
                    if (json[i + 1] !== undefined) {
            
                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../../img/man4.jfif" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2} </h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoProveedor/vista_servicio_curso_proveedor.html" data-cliente-curso = "${json[i].correo}" data-fecha = "${fechas[i]}" onclick="ver(this)"> Ver</a>
                            </div>
        
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../../img/mujer4.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i + 1].nombre} ${json[i + 1].apellido1} ${json[i + 1].apellido2} </h4>
                                <p>${new Date(fechas[i + 1]).getUTCFullYear()}-${new Date(fechas[i + 1]).getUTCMonth() + 1}-${new Date(fechas[i + 1]).getUTCDate()}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoProveedor/vista_servicio_curso_proveedor.html" data-cliente-curso = "${json[i + 1].correo}" data-fecha = "${fechas[i + 1]}" onclick="ver(this)"> Ver</a>
                            </div>
                        </div>
                    </div>`;
=======

                let listado;
                for (let i = 0; i < json.length; i += 2) {

                    if (json[i + 1] !== undefined) {

                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../img/estetica6.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                                <div class="estrellas">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i].proveedor}" onclick="ver(this)"> Ver
                                    más</a>
                            </div>
                        </div>
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../img/estetica7.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i + 1].nombre_servicio}</h4>
                                <div class="estrellas">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i + 1].proveedor}" onclick="ver(this)"> Ver
                                    más</a>
                            </div>
                        </div>
                    </div> `;
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e

                    } else {

                        listado = ` <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
<<<<<<< HEAD
                                <img src="../../img/man4.jfif" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre} ${json[i].apellido1} ${json[i].apellido2} </h4>
                                <p>${new Date(fechas[i]).getUTCFullYear()}-${new Date(fechas[i]).getUTCMonth() + 1}-${new Date(fechas[i]).getUTCDate()}</p>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoProveedor/vista_servicio_curso_proveedor.html" data-cliente-curso = "${json[i].correo}" data-fecha = "${fechas[i]}" onclick="ver(this)"> Ver</a>
                            </div>
        
                        </div>
                    </div>`


                    }


                    document.getElementById('listado').insertAdjacentHTML("beforeend", listado);
=======
                                <img src="../img/estetica6.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                                <div class="estrellas">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i].proveedor}" onclick="ver(this)"> Ver
                                    más</a>
                            </div>
                        </div>
                        
                    </div>`
                    }

                    document.getElementById('listado').insertAdjacentHTML("beforeend", listado);

>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
                }
            }
        )

}

<<<<<<< HEAD



const ver = (element) => {
    let correo = element.getAttribute('data-cliente-curso');
    let fecha = element.getAttribute('data-fecha');
    console.log(fecha)
    let infoCurso = {
        correo,
        fecha
    }
    let jsonInfo = JSON.stringify(infoCurso);
    localStorage.setItem('data-cliente-curso', jsonInfo);

}

/*const api = axios.create({
=======
const ver = (element) => {
    const correo = element.getAttribute('data-proveedor-curso');
    console.log(correo);
    localStorage.setItem('data-proveedor-curso', correo);
}

const servicioHTML = (json) => {
    let listado;
    for (let i = 0; i < json.length; i += 2) {

        if (json[i + 1] !== undefined) {

            listado = ` 
                <div class="listado">
                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="../img/estetica6.jpg" />
                        </div>
                    
                        <div class="descripcion-info">
                            <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                            <div class="estrellas">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>

                        <div class="button-ver">
                            <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i].proveedor}" onclick="ver(this)"> Ver más</a>
                        </div> 
                    </div>

                    <div class="info-listado">
                        <div class="img-categoria">
                            <img src="../img/estetica7.jpg" />
                        </div>
                        
                        <div class="descripcion-info">
                            <h4 class="margin-bottom">${json[i + 1].nombre_servicio}</h4>
                            <div class="estrellas">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                        <div class="button-ver">
                            <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i + 1].proveedor}" onclick="ver(this)"> Ver más</a>
                        </div>
                    </div>
                </div> `;
            } else {
                listado = ` 
                    <div class="listado">
                        <div class="info-listado">
                            <div class="img-categoria">
                                <img src="../img/estetica6.jpg" />
                            </div>
                            <div class="descripcion-info">
                                <h4 class="margin-bottom">${json[i].nombre_servicio}</h4>
                                <div class="estrellas">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                            <div class="button-ver">
                                <a class="button button-aceptar" href="../vistaServicioCursoCliente/vista_servicio_curso_cliente.html" data-proveedor-curso = "${json[i].proveedor}" onclick="ver(this)"> Ver
                                    más</a>
                            </div>
                        </div>
                    </div>
                `;
            }

        document.getElementById('listado').insertAdjacentHTML("beforeend", listado);
    }
}

const api = axios.create({
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    headers: { authorization: localStorage.getItem('token') }
});

<<<<<<< HEAD
const buscarClientes = async (cliente) => {
    try {
        const { data } = await api.post('solicitudes/buscar', {
            cliente,
            tipo: 'cliente',
            estado: 'finalizado',
            proveedor: localStorage.getItem('correo')
=======
const buscarClientes = async (criterioBusqueda) => {
    try {
        const { data } = await api.post('solicitudes/proveedor/buscar', {
            tipo: 'cliente',
            estado: 'curso',
            proveedor: localStorage.getItem('correo'),
            criterioBusqueda
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
        });

        return data;
    } catch (e) {
        throw e;
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const autorizado = verificarAcceso(['proveedor']);
        const buscar = document.getElementById('inputBuscar');

        cargarListadoUsuario();

        let timeout = null;

        if (!autorizado) {
            sinAutorizacionMsj('Usuario no esta autorizado');
        }

        buscar.addEventListener('input', async (e) => {
            const busqueda = e.target.value;

            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = window.setTimeout(async () => {
                const listadoContainer = document.getElementById('listado');
                const clientes = await buscarClientes(busqueda);

<<<<<<< HEAD
                const fechas = clientes.map(({ fecha }) => fecha);
                const correos = clientes.map(({ cliente }) => cliente);

                listadoContainer.innerHTML = '';

                cargarListado(correos, fechas);
=======
                listadoContainer.innerHTML = '';

                servicioHTML(clientes);
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
            }, 1500);
        });
    } catch (e) {
        Swal.fire({
            title: 'Error!',
            text: e.message,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
<<<<<<< HEAD
});*/
=======
});
>>>>>>> 446fd3b08e025d8d71bf61a3871c4f0d9eebf04e
