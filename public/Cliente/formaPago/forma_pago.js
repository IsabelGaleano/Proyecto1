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
            })

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



const enviarEmailFactura = () => {
    let proveedor = 'isagaleano9@gmail.com';
    let cliente = 'luwiisabel@gmail.com';
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

