const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

const exportAsExcelFile = (json, excelFileName) => {
  const worksheet = XLSX.utils.json_to_sheet(json);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  saveAsExcelFile(excelBuffer, excelFileName);
};

const saveAsExcelFile = (buffer, fileName) => {
  const data = new Blob([buffer], { type: EXCEL_TYPE });
  saveAs(
    data,
    fileName +
      '_' +
      new Date().toLocaleDateString().substr(0, 10).replaceAll('/', '-') +
      '_' +
      Math.random().toString().substring(2) +
      EXCEL_EXTENSION
  );
};
