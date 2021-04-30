document.querySelector('#revisar').addEventListener('click', e => {
    let revisar = document.getElementById("revisar");
    let error = revisarForm();
    let number = document.getElementById('number');
    let revisionCard = getCardType(number.value);
    if (!error) {
        if(!revisionCard) {
            Swal.fire({
                title: 'Error!',
                text: 'Número de tarjeta incorrecto',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        } else {
            Swal.fire({
                title: 'Éxito!',
                text: 'Pago éxitoso',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            estadoPago();
            enviarEmailFactura();
            notificaciones();
            notificacionesPagoProveedor();
            insertarAccion();
            revisar.setAttribute("href", "../listadoPagosPendientes/listado_pagos_pendientes_cliente.html")
        }

    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Campos vacíos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })

    }



})

document.querySelector('#number').addEventListener('keyup', e =>{
    let number = document.getElementById('number').value;
    let iconCard = document.getElementById('iconCard');

    if(number.charAt(0) == 5) {
        iconCard.classList.remove('fas', 'fa-credit-card');
        iconCard.classList.add('fab', 'fa-cc-mastercard');
        
    } else if(number.charAt(0) == 4) {
        iconCard.classList.remove('fas', 'fa-credit-card');
        iconCard.classList.add('fab', 'fa-cc-visa');
        
    } else if(number.substring(0, 2) == 34 || number.substring(0, 2) == 37){

        iconCard.classList.remove('fas', 'fa-credit-card');
        iconCard.classList.add('fab', 'fa-cc-amex');

    } else {
        iconCard.classList.remove('fab', 'fa-cc-amex');
        iconCard.classList.remove('fab', 'fa-cc-mastercard');
        iconCard.classList.remove('fab', 'fa-cc-visa');
        iconCard.classList.add('fas', 'fa-credit-card');
        

    }


});



const estadoPago = () => {
    let cliente = localStorage.getItem('correo');
    let proveedor = localStorage.getItem('data-correo-pago');
    var datos = {
        proveedor: proveedor,
        cliente: cliente,
        estado: "curso",
       
    }
  
    fetch("http://localhost:5000/solicitudes/actualizar_solicitudes", {
        method: 'PUT',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            response.json({ message: err })
        });
  
  }


const enviarEmailFactura = () => {
    let cliente = localStorage.getItem('correo');
    let proveedor = localStorage.getItem('data-correo-pago');
    let datos = {
        proveedor: proveedor,
        cliente: cliente,
    }
    fetch("http://localhost:5000/usuarios/factura", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            response.json({ message: err })
        });

}


const notificaciones = () => {

    let cliente = localStorage.getItem('correo');
    let proveedor = localStorage.getItem('data-correo-pago');
    var datos = {
        receptor: cliente,
        descripcion: "Tiene un servicio en curso",
        fecha: new Date(),
        emisor: proveedor,
       
    }
  
    fetch("http://localhost:5000/notificaciones/insertar", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            response.json({ message: err })
        });
  
  }


  

const notificacionesPagoProveedor = () => {

    let cliente = localStorage.getItem('correo');
    let proveedor = localStorage.getItem('data-correo-pago');
    var datos = {
        receptor: proveedor,
        descripcion: "Ha pagado su servicio",
        fecha: new Date(),
        emisor: cliente,
       
    }
  
    fetch("http://localhost:5000/notificaciones/insertar", {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(
            response => {
                return response.json();
            }
        )
        .catch(err => {
            response.json({ message: err })
        });
  
  }

  const insertarAccion = () => {
    let correo = localStorage.getItem('correo');
  
    let hoy = new Date();
    var infoAccion = {
      usuario: correo,
      accion: 'Pagar servicio',
      fecha: hoy,
    };
  
    fetch('http://localhost:5000/acciones/insertar', {
      method: 'POST',
      body: JSON.stringify(infoAccion),
      headers: { 'Content-Type': 'application/json' },
    }).then(respuesta => {
      return respuesta.json();
    });
  };