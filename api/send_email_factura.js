const express = require('express');
const mongoose = require('mongoose');
let router = express.Router();
const nodemailer = require('nodemailer');
const fs = require("fs");
const PDFDocument = require("pdfkit");
const { moveDown } = require('pdfkit');



function sendEmail(correo) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'AppPetsWorld@gmail.com',
      pass: 'AppPetsWorld1!'
    }
  });


  var mailOptions = {
    from: 'AppPetsWorld@gmail.com',
    to: correo,
    subject: 'Factura del servicio',
    html: `  <div style="margin:  0 auto; width: 200px 10px;">
    <div style="text-align: center; padding-bottom: 200px;">
        <div style="text-align: center;">
            <img src="https://res.cloudinary.com/pets-world/image/upload/v1619026436/facturaImg_ibhtfv.jpg" height="150px" width="150px" />
        </div>
        <p style="text-align: center; font-size: 35px;">Factura del servicio</p>
        
            <p style="margin: 30px; font-size: 15px;">A continuación se le ha adjuntado <br/>su factura en formato PDF
            </p>
            <p style="margin: 40px 10px; font-size: 15px;">Si desea contactarse con nosotros <br/> haga clic en el botón a continuación</p>
            <a href="http://localhost:5000/General/login/login.html"
                style="text-decoration: none; padding: 13px 120px; background-color: #005CE4; color: #fff; margin: 40px;">Contacto</a>
        
    </div>

</div>
 `,
    attachments: [{
      filename: 'Factura.pdf',
      path: './pdf/factura.pdf'
    }]

  }



  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}



function createInvoice(invoice, path, correo) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  const stream = doc.pipe(fs.createWriteStream(path))
  stream.on('finish', function () {
    sendEmail(correo);
  });

}

function generateHeader(doc) {
  doc
    .image("./pdf/logoPetsBlanco.png", 2, 15, { width: 230, height: 130 })
    .fillColor("#444444")
    .text("Pets World.", 200, 50, { align: "right" })
    .text("San José, Barrio Escalante", 200, 65, { align: "right" })
    .text("AppPetsWorld@gmail.com", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Factura", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Nombre del servicio: " + invoice.shipping.nombre_servicio, 50, customerInformationTop)
    .font("Helvetica")
    .text("Nivel del servicio: " + invoice.shipping.nivel_servicio, 50, customerInformationTop + 15)
    .font("Helvetica")
    .font("Helvetica")
    .text("Costo del servicio: " + invoice.shipping.costo, 50, customerInformationTop + 30)
    .font("Helvetica")
    .text("Correo electrónico: " + invoice.shipping.correo_cliente, 300, customerInformationTop + 15)
    .font("Helvetica")
    .text("Factura para: " +
      invoice.shipping.nombre_cliente +
      " " +
      invoice.shipping.apellido1_cliente +
      " " +
      invoice.shipping.apellido2_cliente,
      300,
      customerInformationTop + 30
    )
   
  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Proveedor",
    "Description",
    "",
    "Cantidad",
    "Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      item.amount / item.quantity,
      item.quantity,
      item.amount
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    invoice.subtotal
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Pago hasta el día",
    "",
    invoice.paid
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Pago final",
    "",
   invoice.subtotal - invoice.paid
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency() {
  return "₡"
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};


