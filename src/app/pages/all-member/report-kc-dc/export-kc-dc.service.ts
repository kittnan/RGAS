import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { Cell, Row, Workbook, Worksheet } from 'exceljs';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ExportKcDcService {

  claims: any
  constructor(
    private http: HttpClient
  ) { }

  export(claims: any, date: any) {
    try {
      this.claims = claims
      this.http.get('./assets/excel/report-kc-dc2.xlsx', { responseType: "arraybuffer" }).subscribe(async (res: any) => {
        const wb = new Workbook()
        const arrayBuffer = await new Response(res).arrayBuffer();
        await wb.xlsx.load(arrayBuffer)
        let ws1: Worksheet | undefined = wb.getWorksheet('Export for KC-DS')
        let cell = ws1?.getCell('D2')
        if (cell) {
          let value_d2: any = cell?.value ? cell?.value : ''
          value_d2 = value_d2.replace('month', `${date.start ? moment(date.start).format('MMM-YY') + ' - ' : ''}${date.end ? moment(date.end).format('MMM-YY') : ''}`)
          cell.value = value_d2
        }
        ws1 = this.setKC_DC(ws1)


        if (ws1) {
          ws1.eachRow({ includeEmpty: true }, function (row: any, rowNumber: any) {
            if (rowNumber > 6) {
              row.eachCell({ includeEmpty: true }, function (cell: any, colNumber: any) {
                cell.alignment = { wrapText: true, horizontal: 'center', vertical: 'middle' };
                cell.border = {
                  top: { style: 'thin' },
                  left: { style: 'thin' },
                  bottom: { style: 'thin' },
                  right: { style: 'thin' }
                };
              });
            }

          });
          wb.xlsx.writeBuffer().then(excelData => {
            const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            let name = `report_KC_DC_${date.start ? moment(date.start).format('MMM-YY') + ' - ' : ''}${date.end ? moment(date.end).format('MMM-YY') : ''}.xlsx`
            saveAs(blob, name)
          })
        }
      })
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }


  setKC_DC(ws: Worksheet | undefined) {
    console.log("🚀 ~ ws:", ws)
    if (ws) {
      let rows: string[] = this.claims.map((claim: any, i: number) => {
        let uploadOBL = this.submitFinalReportToOBL(claim.reports) ? 'Closed' : 'Pending';
        let submitCustomer = this.submitFinalReportToCustomer(claim.reports) ? 'Closed' : 'Pending';
        let analysisPIC = claim?.analysisPIC?.name ? claim?.analysisPIC?.name : '-'
        let returnStyle = claim.returnStyle ? claim.returnStyle : '-'
        let modelClassification = claim.modelClassification
        let calendarYear = claim.calendarYear ? moment(claim.calendarYear).format('MMM-YYYY') : '-'
        let partReceivingDate = claim.results?.partReceivingDate ? moment(claim.results.partReceivingDate).format('DD-MMM-YYYY') : '-'
        let claimRegisterDate = claim.claimRegisterDate ? moment(claim.claimRegisterDate).format('DD-MMM-YYYY') : '-'

        let receiveInformationDate = claim.receiveInfoDate? moment(claim.receiveInfoDate).format('DD-MMM-YYYY') :'-'

        let dueDate = claim.dueDate ? moment(claim.dueDate).format('DD-MMM-YYYY') : '-'

        let finalReportUploadDate = '-'
        let finalReportSubmitDate = '-'

        let finalReportItem = claim.reports.find((report: any) => report.name == 'finalReport')
        if (finalReportItem) {
          finalReportUploadDate = finalReportItem.dateSubmitToCustomer ? moment(finalReportItem.dateSubmitToCustomer).format('DD-MMM-YYYY') : '-'
        }
        let finalReportSubmitItem = claim.reports.find((report: any) => report.name == 'finalReportOBL')
        if (finalReportSubmitItem) {
          finalReportSubmitDate = finalReportSubmitItem.dateSubmitToCustomer ? moment(finalReportSubmitItem.dateSubmitToCustomer).format('DD-MMM-YYYY') : '-'
        }

        let claimNo = claim.claimNo ? claim.claimNo : '-'
        let customerNo = claim.customerNo ? claim.customerNo : '-'
        let sideNo = claim.sideNo ? claim.sideNo : '-'
        let salePIC = claim.salePIC ? claim.salePIC : '-'
        let customerNameB = claim.customerName ? claim.customerName : '-'
        let saleCompany = claim.saleCompany ? claim.saleCompany : '-'
        let RGAS_no = claim.results?.rgaNo ? claim.results?.rgaNo : '-'
        let ktcModelNo = claim.modelNo ? claim.modelNo : '-'
        let ktcModelCode = claim.modelCode ? claim.modelCode : '-'
        let qty = claim.qty ? claim.qty : '-'
        let productLotNo = claim.productLotNo ? claim.productLotNo : '-'
        let productMonth = claim.productionMonth ? moment(claim.productionMonth).format('MMM-YYYY') : '-'
        let commercialDistribution = claim.commercialDistribution ? claim.commercialDistribution : '-'
        let useAppear = claim.results?.appearance?.result ? claim.results?.appearance?.result : '-'
        let occurredLocation = claim.occurredLocation ? claim.occurredLocation : '-'

        let descriptionJP = claim.descriptionJP ? claim.descriptionJP : '-'
        let descriptionENG = claim.descriptionENG ? claim.descriptionENG : '-'
        let ktcAnalysisResult = claim.results?.ktcAnalysisResult ? claim.results?.ktcAnalysisResult : '-'
        let functionAp = `${claim.results?.function?.result ? claim.results?.function?.result : '-'} / ${claim.results?.appearance?.result ? claim.results?.appearance?.result : '-'}`
        let importance = claim.importance ? claim.importance : ''
        let ng = claim.reportInformations?.ng?.qty ? claim.reportInformations?.ng?.qty : '-'
        let notAccept = claim.reportInformations?.notAccepted?.qty ? claim.reportInformations?.notAccepted?.qty : '-'
        let noAbnormality = claim.reportInformations?.noAbnormality?.qty ? claim.reportInformations?.noAbnormality?.qty : '-'
        let withinSpec = claim.reportInformations?.withinSpec?.qty ? claim.reportInformations?.withinSpec?.qty : '-'
        let notRecurred = claim.reportInformations?.notRecurred?.qty ? claim.reportInformations?.notRecurred?.qty : '-'
        let difference = claim.reportInformations?.difference?.qty ? claim.reportInformations?.difference?.qty : '-'
        let causeByCustomer = claim.causeByCustomer ? claim.causeByCustomer : '-'
        let outWarranty = claim.outWarranty ? claim.outWarranty : '-'

        let ngValue1 = claim.reportInformations?.ng?.value1 ? claim.reportInformations?.ng?.value1 : '-'
        let notAcceptValue1 = claim.reportInformations?.notAccepted?.value1 ? claim.reportInformations?.notAccepted?.value1 : '-'
        let noAbnormalityValue1 = claim.reportInformations?.noAbnormality?.value1 ? claim.reportInformations?.noAbnormality?.value1 : '-'
        let withinSpecValue1 = claim.reportInformations?.withinSpec?.value1 ? claim.reportInformations?.withinSpec?.value1 : '-'
        let notRecurredValue1 = claim.reportInformations?.notRecurred?.value1 ? claim.reportInformations?.notRecurred?.value1 : '-'
        let differenceValue1 = claim.reportInformations?.difference?.value1 ? claim.reportInformations?.difference?.value1 : '-'

        let ngValue2 = claim.reportInformations?.ng?.value2 ? claim.reportInformations?.ng?.value2 : '-'
        let notAcceptValue2 = claim.reportInformations?.notAccepted?.value2 ? claim.reportInformations?.notAccepted?.value2 : '-'
        let noAbnormalityValue2 = claim.reportInformations?.noAbnormality?.value2 ? claim.reportInformations?.noAbnormality?.value2 : '-'
        let withinSpecValue2 = claim.reportInformations?.withinSpec?.value2 ? claim.reportInformations?.withinSpec?.value2 : '-'
        let notRecurredValue2 = claim.reportInformations?.notRecurred?.value2 ? claim.reportInformations?.notRecurred?.value2 : '-'



        let values = [
          uploadOBL, submitCustomer, analysisPIC, returnStyle, modelClassification, calendarYear, partReceivingDate, claimRegisterDate, receiveInformationDate, dueDate, finalReportUploadDate, finalReportSubmitDate, claimNo, customerNo, sideNo, salePIC, customerNameB, saleCompany, RGAS_no, ktcModelNo, ktcModelCode, qty, productLotNo, productMonth, commercialDistribution, useAppear, occurredLocation, descriptionJP, descriptionENG, ktcAnalysisResult, functionAp, importance, ng, notAccept, noAbnormality, withinSpec, notRecurred, difference, causeByCustomer,
          outWarranty, ngValue1, notAcceptValue1, noAbnormalityValue1, withinSpecValue1, notRecurredValue1, differenceValue1, ngValue2, notAcceptValue2, noAbnormalityValue2, withinSpecValue2
        ]
        if (i === 0) {
          let row: ExcelJS.Row = ws.getRow(7)
          row.values = values
        } else {
          ws.addRow(values, 'i')
        }

        // return [
        //   uploadOBL, submitCustomer, analysisPIC, returnStyle, modelClassification, calendarYear, partReceivingDate, claimRegisterDate
        // ]
      })
      // console.log("🚀 ~ rows:", rows)



      // ws.addRows(rows, 'i')
    } else {

    }
    return ws
  }

  // todo condition show submit final report customer
  submitFinalReportToCustomer(reports: any) {
    if (reports && reports.length > 0 && reports.some((report: any) => report.name == 'finalReport')) {
      return true
    }
    return false
  }
  // todo condition show submit  final report OBL
  submitFinalReportToOBL(reports: any) {

    if (reports && reports.length > 0 && reports.some((report: any) => report.name == 'finalReportOBL')) {
      return true
    }
    return false
  }

}
