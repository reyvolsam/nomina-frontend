import { Injectable } from '@angular/core';
import { Workbook, Borders, Fill, Font, Alignment } from 'exceljs';
import * as fs from 'file-saver';
import { Work } from 'src/app/models/Work';
@Injectable({
  providedIn: 'root'
})
export class ExcelGenerateService {

  borderMedium: Partial<Borders> = {
    top: { style: 'medium' },
    left: { style: 'medium' },
    bottom: { style: 'medium' },
    right: { style: 'medium' }
  }

  borderThin: Partial<Borders> = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' }
  }

  borderThinNoTop: Partial<Borders> = {
    left: { style: 'thin' },
    right: { style: 'thin' },
    bottom: { style: 'thin' }
  }

  borderThinNoBottom: Partial<Borders> = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    right: { style: 'thin' },

  }

  fillGreen: Fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'C6E0B4' },
    // bgColor: { argb: 'C6E0B4' }
  }

  fillGreen1: Fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'bdd7ee' },
    // bgColor: { argb: 'C6E0B4' }
  }

  alignmentCenter: Partial<Alignment> = { vertical: 'middle', horizontal: 'center' }

  fontHeader: Partial<Font> = { name: 'Arial', size: 9, bold: true, color: { 'argb': '0000ff' } }
  fontValue: Partial<Font> = { name: 'Arial', size: 10, bold: true }

  constructor() {

  }

  async generateExcel(data: Work) {

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(`${data.first_name} ${data.last_name} ${data.name}`);

    // adjust pageSetup settings afterwards
    worksheet.pageSetup.margins = {
      left: 0.4, right: 0.4,
      top: 0.6, bottom: 0.4,
      header: 0.11811, footer: 0.11811
    };

    //Ancho de columnas
    worksheet.getColumn('A').width = 15.14
    worksheet.getColumn('B').width = 10.71
    worksheet.getColumn('C').width = 13.57
    worksheet.getColumn('D').width = 5.29
    worksheet.getColumn('E').width = 10.71
    worksheet.getColumn('F').width = 10.71
    worksheet.getColumn('G').width = 10.71
    worksheet.getColumn('H').width = 10.71
    worksheet.getColumn('I').width = 10.71


    // Add Row and formatting
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);

    const titleRow = worksheet.addRow(['ATTIX SOLUCIONES INTEGRALES SA DE CV']);
    titleRow.font = { name: 'Calibri', size: 16, bold: true };
    titleRow.alignment = this.alignmentCenter;
    worksheet.mergeCells('A4:I4')

    worksheet.addRow([]);

    const headerSheet = worksheet.addRow(['Solicitud de Ingreso del Trabajador']);
    headerSheet.font = { name: 'Calibri', size: 22, bold: true };
    headerSheet.alignment = this.alignmentCenter

    worksheet.mergeCells('A6:I8')
    worksheet.getCell('A6:I8').border = this.borderMedium
    worksheet.getCell('A6:I8').fill = this.fillGreen

    worksheet.addRow([]);


    //Form

    this.generateHeaderBorderMedium(worksheet, 'A10', 'I10', 'INFORMACIÓN DE PERSONAL (ALTA)', '');

    //Nombre de empleado
    this.generateField(worksheet, 'A11', 'F11', 'Nombre del empleado (apellido paterno, materno, por ultimo nombre)',
      'A12', 'F12', `${data.first_name} ${data.last_name} ${data.name}`)

    // No. de Seguridad Social
    this.generateField(worksheet, 'G11', 'I11', 'Numero de Seguridad Social',
      'G12', 'I12', `${data.social_security_number}`)

    // Direccion
    this.generateField(worksheet, 'A13', 'D13', 'Dirección',
      'A14', 'D14', `${data.current_address}`)

    // Ciudad
    this.generateField(worksheet, 'E13', 'F13', 'Ciudad',
      'E14', 'F14', `${data.birth_city}`)

    // Estado
    this.generateField(worksheet, 'G13', 'H13', 'Estado',
      'G14', 'H14', `${data.state}`)

    // CP
    this.generateField(worksheet, 'I13', 'I13', 'CP',
      'I14', 'I14', `${data.cp}`)

    // Fecha nacimiento
    this.generateField(worksheet, 'A15', 'B15', 'Fecha De Nacimiento',
      'A16', 'B16', `${data.birth_date}`)


    // Lugar nacimiento
    this.generateField(worksheet, 'C15', 'D15', 'Lugar De Nacimiento',
      'C16', 'D16', `${data.birth_city}`)

    // Estado Civil
    this.generateField(worksheet, 'E15', 'F15', 'Estado Civil',
      'E16', 'F16', `${data.current_state}`)


    // CURP
    this.generateField(worksheet, 'G15', 'I15', 'Clave Única de Registro de Población',
      'G16', 'I16', `${data.curp}`)


    // RFC
    this.generateField(worksheet, 'A17', 'C17', 'Registro Federal de Causante',
      'A18', 'C18', `${data.rfc}`)

    // Numero de Telefono
    this.generateField(worksheet, 'D17', 'F17', 'Número de Telefono',
      'D18', 'F18', `${data.telephone}`)

    // Otros Telefono de Contacto
    this.generateField(worksheet, 'G17', 'I17', 'Otros Telefonos de Contacto',
      'G18', 'I18', '')

    // Nombre del padre
    this.generateField(worksheet, 'A19', 'D19', 'Nombre del Padre',
      'A20', 'D20', `${data.fathers_name}`)

    // Nombre de la madre
    this.generateField(worksheet, 'E19', 'I19', 'Nombre de la Madre',
      'E20', 'I20', `${data.mothers_name}`)

    worksheet.addRow([])
    worksheet.addRow([]);

    //Personal/reclutamiento
    this.generateHeaderBorderMedium(worksheet, 'A23', 'I23',
      'PERSONAL/RECLUTAMIENTO', '');

    // Fecha de Contratación
    this.generateField(worksheet, 'A24', 'E24', 'Fecha de Contratación',
      'A25', 'E25', ``)

    // Perfil
    this.generateField(worksheet, 'F24', 'I24', 'Perfil',
      'F25', 'I28', '')


    // Salario Diario
    this.generateField(worksheet, 'A26', 'A26', 'Salario Diario',
      'A27', 'A27', `${data.real_daily_salary}`)

    // Salario Mensual
    this.generateField(worksheet, 'B26', 'C26', 'Salario Mensual',
      'B27', 'C27', '')

    // S.D.I
    this.generateField(worksheet, 'D26', 'E26', 'S.D.I',
      'D27', 'E27', '119.81')


    //CREDITO INFONAVIT
    this.generateHeaderBorderThin(worksheet, 'A28', 'E28', 'CREDITO INFONAVIT',
      '')


    // Numero de Credito
    this.generateField(worksheet, 'A29', 'B29', 'Número de Crédito',
      'A30', 'B30', `${data.infonavit_credit_number}`)

    // Valor de Descuento
    this.generateField(worksheet, 'C29', 'E29', 'Valor de Descuento',
      'C30', 'E30', '')

    // Puesto
    this.generateField(worksheet, 'F29', 'I29', 'Puesto',
      'F30', 'I30', 'VIGILANTE')

    // Descripción del Puesto
    this.generateField(worksheet, 'A31', 'I31', 'Descripción del Puesto',
      'A32', 'I32', 'VIGILANTE CENTRO DE SERVICIOS VERACRUZ')

    worksheet.addRow([])
    worksheet.addRow([])
    worksheet.addRow([])
    worksheet.addRow([])

    //SISTEMA DE PAGO DE NOMINA
    this.generateHeaderBorderMedium(worksheet, 'A37', 'I37',
      'SISTEMA DE PAGO DE NOMINA', '');

    worksheet.getCell('A38').font = this.fontHeader;
    worksheet.getCell('A38').alignment = this.alignmentCenter;
    worksheet.getCell('A38').fill = this.fillGreen1;
    worksheet.getCell('A38').value = `${data.back_electronic_payment}`;

    worksheet.mergeCells('A38:D38')


    //Cuanta
    worksheet.getCell('A39').value = `${data.acount_number}`;
    worksheet.getCell('A39').border = this.borderThin;
    worksheet.getCell('A39').alignment = this.alignmentCenter;
    worksheet.mergeCells('A39:D39')

    //Clabe
    worksheet.getCell('A40').value = `${data.key_account}`;
    worksheet.getCell('A40').alignment = this.alignmentCenter;
    worksheet.getCell('A40').border = this.borderThin;
    worksheet.mergeCells('A40:D40')


    worksheet.getCell('E38').value = 'BANCO';
    worksheet.getCell('E39').value = 'CUENTA';
    worksheet.getCell('E40').value = 'CLABE';

    worksheet.getCell('E39').alignment = this.alignmentCenter;
    worksheet.getCell('E38').alignment = this.alignmentCenter;
    worksheet.getCell('E40').alignment = this.alignmentCenter;


    // TARJETA
    this.generateField(worksheet, 'F38', 'I38', 'TARJETA',
      'F39', 'I40', '4915 6633 5445 8984')




    worksheet.getCell('C43').value = 'Carretera Transistmica KM 7.5, Colonia Tierra Nueva, '
    worksheet.mergeCells('C43:G43')
    worksheet.getCell('C43').alignment = this.alignmentCenter;

    worksheet.getCell('B44').value = 'C.P. 96496, Coatzacoalcos, Veracruz. ' + 'Teléfono: (921) 688 29 10'
    worksheet.mergeCells('B44:H44')
    worksheet.getCell('B44').alignment = this.alignmentCenter;

    worksheet.getCell('B45').value = 'R.F.C. CAM-130930-DR3' + ' correo: caymbraba@hotmail.com'
    worksheet.mergeCells('B45:H45')
    worksheet.getCell('B45').alignment = this.alignmentCenter;

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Formato Alta Attix.xlsx');
    });




  }

  generateHeaderBorderMedium(worksheet, startColumn, endColumn, headText, valueText) {
    let headerValue = worksheet.addRow([`${headText}`])
    headerValue.font = { name: 'Calibri', size: 11, bold: true };
    worksheet.getCell(`${startColumn}`).alignment = this.alignmentCenter;
    worksheet.mergeCells(`${startColumn}:${endColumn}`);
    worksheet.getCell(`${startColumn}`).fill = this.fillGreen
    worksheet.getCell(`${startColumn}`).border = this.borderMedium

    console.log(startColumn.split(1));

  }

  generateHeaderBorderThin(worksheet, startColumn, endColumn, headText, valueText) {
    worksheet.getCell(`${startColumn}`).value = `${headText}`
    worksheet.getCell(`${startColumn}`).font = { name: 'Calibri', size: 11, bold: true };
    worksheet.getCell(`${startColumn}`).alignment = this.alignmentCenter;
    worksheet.mergeCells(`${startColumn}:${endColumn}`);
    worksheet.getCell(`${startColumn}`).fill = this.fillGreen
    worksheet.getCell(`${startColumn}`).border = this.borderThin

  }

  generateField(worksheet, startColumnHead, endColumnHead, headText, startColumnValue, endColumnValue, valueText) {
    valueText == 'null' ? valueText = '' : valueText
    worksheet.getCell(`${startColumnHead}`).value = headText;
    worksheet.mergeCells(`${startColumnHead}:${endColumnHead}`);
    worksheet.getCell(`${startColumnHead}`).fill = this.fillGreen1;
    worksheet.getCell(`${startColumnHead}`).font = this.fontHeader;
    worksheet.getCell(`${startColumnHead}:${endColumnHead}`).alignment = this.alignmentCenter;
    worksheet.getCell(`${startColumnHead}`).border = this.borderThinNoBottom;

    let value = worksheet.getCell(`${startColumnValue}`);
    value.value = valueText
    value.font = this.fontValue
    worksheet.mergeCells(`${startColumnValue}:${endColumnValue}`)
    value.border = this.borderThinNoTop
    worksheet.getCell(`${startColumnValue}:${endColumnValue}`).alignment = this.alignmentCenter;

  }



}
