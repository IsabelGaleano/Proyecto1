const express = require('express');
let router = express.Router();
const fs = require('fs');
const PDFDocument = require('pdfkit');
const FileSaver = require('file-saver');
const path = require('path');

const PDF_EXTENSION = '.pdf';

router.post('/', (req, res) => {
  const filePath = './pdf/';
  const filename =
    req.body.filename +
    '_' +
    Math.random().toString().substring(2) +
    PDF_EXTENSION;
  crearPDF(req.body.data, filePath + filename).then(() => {
    res.json({
      filename,
      message: 'success',
    });
  });
});

router.get('/download_pdf/:filename', (req, res) => {
  const filename = req.params.filename;
  console.log(filename);
  res.sendFile(path.join(__dirname, '../pdf/', filename));
});

function crearPDF(data, path) {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({ size: 'A4', margin: 50 });

    generateHeader(doc);
    generateTable(doc, data);

    doc.end();
    const stream = doc.pipe(fs.createWriteStream(path));
    stream.on('finish', function () {
      resolve();
    });
  });
}

function generateHeader(doc) {
  doc
    .image('./pdf/logoPetsBlanco.png', 2, 15, { width: 230, height: 130 })
    .fillColor('#444444')
    .text('Pets World.', 200, 50, { align: 'right' })
    .text('San José, Barrio Escalante', 200, 65, { align: 'right' })
    .text('AppPetsWorld@gmail.com', 200, 80, { align: 'right' })
    .moveDown();
}

function generateTable(doc, data) {
  let i;
  const tableTop = 330;

  doc.font('Helvetica-Bold');

  let tableHeaders = [];
  for (const key in data[0]) {
    tableHeaders.push(key.charAt(0).toUpperCase() + key.slice(1));
  }

  generateTableRow(doc, tableTop, ...tableHeaders);
  generateHr(doc, tableTop + 20);
  doc.font('Helvetica');

  for (i = 0; i < data.length; i++) {
    const item = data[i];
    const position = tableTop + (i + 1) * 30;
    let tableRowData = [];
    for (const key in item) {
      tableRowData.push(item[key]);
    }
    generateTableRow(doc, position, ...tableRowData);

    generateHr(doc, position + 20);
  }
}

function generateTableRow(doc, y, ...data) {
  let initialSize = 50;
  doc.fontSize(10);

  data.forEach(v => {
    doc.text(v, initialSize, y);
    initialSize += 100;
  });
}

function generateHr(doc, y) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

module.exports = router;
