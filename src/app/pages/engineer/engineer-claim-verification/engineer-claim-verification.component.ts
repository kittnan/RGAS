import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import * as Exceljs from 'exceljs'
import { saveAs } from 'file-saver';
import moment from 'moment';

@Component({
  selector: 'app-engineer-claim-verification',
  templateUrl: './engineer-claim-verification.component.html',
  styleUrls: ['./engineer-claim-verification.component.scss']
})
export class EngineerClaimVerificationComponent implements OnInit {

  headers: any
  dataArr: string[] = []
  constructor(
    private $claim: HttpClaimService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    let p = new HttpParams()
    // p = p.set('registerNo', JSON.stringify(['2024040001'])).set('no', JSON.stringify([1]))
    this.$claim.getClaimVerification(p).pipe(
      map((resData: any) => {
        return resData.map((data: any) => {
          return {
            ...data,
            modelNo: data.modelNo ? JSON.stringify(data.modelNo) : '',
            modelNoSMT: data.modelNoSMT ? JSON.stringify(data.modelNoSMT) : '',
            modelNoPNL: data.modelNoPNL ? JSON.stringify(data.modelNoPNL) : '',

          }
        })

      })
    ).subscribe((result: any) => {
      this.dataArr = result.map((data: any) => {
        return [
          this.convertToString(data.claimNo),
          this.convertToString(data.claimDetail),
          '',
          this.convertToString(data.modelNo),
          this.convertToString(data.modelNoPNL),
          this.convertToString(data.modelNoSMT),
          this.convertToString(data.size),
          this.convertToString(data.type),
          data.dateSubmitToCustomer ? moment(data.dateSubmitToCustomer).format('DD-MMM-YY') : '',
          '',
          '',
          '',
          '',
          this.convertToString(data.actionItem),
          '',
          this.convertToString(data.rootCause),
          this.convertToString(data.customerInternal),
          '',
          data.implementEffective ? moment(data.implementEffective).format('DD-MMM-YY') : data.implementEffective,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
        ]
      })


      this.export()

    })
  }

  private convertToString(value: any) {
    if (value) {
      return typeof value == 'string' ? value : value.toString()
    } else {
      return ''
    }
  }
  copyRowStyles(sourceRow: Exceljs.Row, targetRow: Exceljs.Row) {
    sourceRow.eachCell((cell, colNumber) => {
      const targetCell = targetRow.getCell(colNumber);
      if (cell.style) {
        targetCell.style = { ...cell.style };
      }
      targetCell.value = cell.value;
    });
  }


  export() {
    try {
      this.http.get('./assets/excel/claim-verification.xlsx', { responseType: "arraybuffer" }).subscribe(async (res: any) => {
        const wb = new Exceljs.Workbook()
        const arrayBuffer = await new Response(res).arrayBuffer();
        await wb.xlsx.load(arrayBuffer)
        let tempWs: Exceljs.Worksheet
        let ws1: Exceljs.Worksheet | any = wb.getWorksheet('Claim details')
        if (ws1 !== undefined) {
          this.dataArr.forEach(element => {
            ws1.addRow(element)
            const lastRow = ws1.lastRow
            if (lastRow) {
              if (ws1 && ws1.lastRow) {
                let row: Exceljs.Row = ws1.getRow(ws1.lastRow.number)
                ws1.mergeCells(row.number, 2, row.number, 3)
                ws1.mergeCells(row.number, 14, row.number, 15)
                ws1.mergeCells(row.number, 25, row.number, 26)
                row.eachCell((cell: Exceljs.Cell, colNum: number) => {
                  cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                  cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                  };
                })
              }
            }
          });
          // this.dataArr.forEach((data: any, i: number) => {
          //   const targetRowNum: number = 20 + i
          //   let row: Exceljs.Row = ws1.getRow(targetRowNum)
          //   row.values = data
          // });
          ws1.addRow([])
          ws1.addRow([])
          ws1.addRow(['Remark :'])
          ws1.addRow(['1. CQA will hold the meeting with team by monthly to explain the countermeasure items before going to verify in the process.'])
          let cell1 = ws1.getCell(ws1.lastRow?.number, 1)
          cell1.alignment = { wrapText: false };
          ws1.addRow(['2. CQA will share the results in e-mail by monthly after going to verify in the process.'])
          let cell2 = ws1.getCell(ws1.lastRow?.number, 1)
          cell2.alignment = { wrapText: false };
          ws1.addRow([])

          let lastRow = ws1.lastRow
          if (lastRow) {
            let address = `AD${lastRow.number}`
            ws1.getCell(address).value = 'CQAF5110.I1.Claim.1.2-8'
          }

        }
        ws1.views[0].activeCell = 'C48'
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'output.xlsx');
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

}
