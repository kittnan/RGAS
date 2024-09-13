import { Injectable } from '@angular/core';
import * as Exceljs from 'exceljs'
import { saveAs } from 'file-saver';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  export(items: any, filename: string) {
    const workbook = new Exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Data');
    let firstObj = items[0]
    delete firstObj._id
    delete firstObj.createdAt
    delete firstObj.updatedAt
    let header: any = []
    for (const key in firstObj) {
      header.push(key)
    }
    worksheet.addRow(header)

    items.forEach((item: any) => {
      let newRow: any = []
      header.forEach((head: any) => {
        newRow.push(item[head])
      })
      worksheet.addRow(newRow)
    })


    // Adjust column widths
    worksheet.columns.forEach((column: any) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell: any) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    // Create the Excel file and download it

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      saveAs(blob, `${filename}.xlsx`);
    });

  }
  excelSheetToObject(ws: Exceljs.Worksheet | undefined) {
    return new Promise(resolve => {
      let data: any = [];
      if (ws) {
        let head: any = []
        ws.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber == 1) {
            head = row.values
            head = head.map((h: any) => h.includes('.') ? h.replaceAll('.', '') : h)
          } else {
            const rowData: any = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              rowData[`${head[colNumber]}`] = cell.value;
            });
            data.push(rowData);
          }
        });
        resolve(data)
      } else {
        resolve([])
      }
    })
  }
}
