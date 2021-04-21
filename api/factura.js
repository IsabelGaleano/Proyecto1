const { createInvoice } = require("./send_email_factura");
const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const fetch = require("node-fetch");

let nombreCliente;
let apellido1Cliente;
let apellido2Cliente;
let nombreProveedor;
let apellido1Proveedor;
let apellido2Proveedor;


router.post('/factura', (req, res) => {
  let { proveedor, cliente} = req.body;
  buscarCliente(cliente, proveedor);
 
});


const buscarCliente = (cliente, proveedor) => {
  var datos = {
    correo: cliente
  }

  fetch("http://localhost:5000/usuarios/buscar", {
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
       
        for (let i = 0; i < json.length; i++) {

          nombreCliente = json[i].nombre;
          apellido1Cliente = json[i].apellido1;
          apellido2Cliente = json[i].apellido2;
         
        }
        buscarProveedor(proveedor, cliente)
        

      }
    )
}



const buscarProveedor = (proveedor, cliente) => {
  var datos = {
    correo: proveedor
  }

  fetch("http://localhost:5000/usuarios/buscar", {
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
       
        for (let i = 0; i < json.length; i++) {

          nombreProveedor = json[i].nombre;
          apellido1Proveedor = json[i].apellido1;
          apellido2Proveedor = json[i].apellido2;
         
        }
        
        cargarInfo(proveedor, cliente);
      }
    )
}



const cargarInfo = (proveedor, cliente) => {
  var datos = {
    proveedor: proveedor
  }
  fetch("http://localhost:5000/servicios/buscar", {
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

        let proveedor;
        let nombre_servicio = "";
        let nivel_servicio;
        let descripcion;
        let costo;
        let dias_servicio;
        let horario_servicio;
        let imagenes_servicio;
        let whatsapp;
        let instagram;
        let facebook;
        let estado;
        let categoria_servicio;

        console.log(json);
        for (let i = 0; i < json.length; i++) {
          proveedor = json[i].proveedor;
          nombre_servicio = json[i].nombre_servicio;
          costo = json[i].costo;
          descripcion = json[i].descripcion;
          nivel_servicio = json[i].nivel_servicio;
          categoria_servicio = json[i].categoria_servicio;
          whatsapp = json[i].whatsapp
        }
        const invoice = {
          shipping: {
            nombre_cliente: nombreCliente,
            apellido1_cliente: apellido1Cliente,
            apellido2_cliente: apellido2Cliente,
            proveedor_servicio: nombreProveedor,
            correo_cliente: cliente,
            nombre_servicio: nombre_servicio,
            nivel_servicio: nivel_servicio,
            costo: costo
            
          },
          items: [
            {
              item: nombreProveedor,
              description: descripcion,
              quantity: 1,
              amount: 0
            },
            {
              item: apellido1Proveedor,
              description: "Teléfono: "+ whatsapp,
              quantity: 0,
              amount: costo
            }
          ],
          subtotal: 0,
          paid: costo,
        };

        createInvoice(invoice, "./pdf/factura.pdf", cliente);

      }
    )
}


module.exports = router;
