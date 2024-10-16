import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Exceljs from 'exceljs';
import moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { lastValueFrom } from 'rxjs';
import { HttpEstimateShipmentService } from 'src/app/https/http-estimate-shipment.service';
import { HttpModelsService } from 'src/app/https/http-models.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
@Component({
  selector: 'app-engineer-delivery',
  templateUrl: './engineer-delivery.component.html',
  styleUrls: ['./engineer-delivery.component.scss']
})
export class EngineerDeliveryComponent implements OnInit {

  models: any = []
  month: any = null
  dateFormat = 'YYYY-MMM'

  headers: any = []
  dataSet: any
  constructor(
    private $model: HttpModelsService,
    private $shipment: HttpEstimateShipmentService,
    private $loader: NgxUiLoaderService,
    private $alert: SweetAlertGeneralService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      let res: any = await lastValueFrom(this.$model.get(new HttpParams()))
      this.models = res
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  upload(e: any) {
    let files = e.target.files;
    if (files?.length != 0) {
      let statusMessage: any = document.getElementById('statusMessage')
      const file = files[0];
      let reader = new FileReader();

      // เริ่มต้นแสดงสถานะการทำงาน
      statusMessage.innerText = "เริ่มการอัปโหลดไฟล์...";

      reader.onload = (event: any) => {
        statusMessage.innerText = "กำลังอ่านข้อมูลไฟล์...";
        const data = new Uint8Array(event.target.result);
        const wb = new Exceljs.Workbook();

        wb.xlsx.load(data).then(() => {
          statusMessage.innerText = "กำลังประมวลผลข้อมูล...";
          const ws = wb.getWorksheet('Delivery');
          let dataMapping: any = [];
          let totalTarget: any;

          ws?.getRow(7).eachCell((cell: Exceljs.Cell, i_cell: number) => {
            if (cell.value == 'Total') {
              totalTarget = {
                row: cell.row,
                col: cell.col
              };
            }
          });

          ws?.getColumn(2).eachCell((cell: Exceljs.Cell, i_cell: number) => {
            if (
              this.models.some((model: any) => model.Model == cell.value)
            ) {
              const modelRef = this.models.find((model: any) => model.Model == cell.value);
              const estimateCell: any = ws.getCell(cell.row + 1, totalTarget.col);
              const actualCell: any = ws.getCell(cell.row + 2, totalTarget.col);
              const year = moment(this.month).format('YYYY');
              const month = moment(this.month).format('MMM');
              const estMonth = `est-${month}`;
              const actMonth = `act-${month}`;
              const obj = {
                ...modelRef,
              };

              obj[estMonth] = this.convertValue(estimateCell.value);
              obj[actMonth] = this.convertValue(actualCell.value);
              obj.year = year;
              delete obj._id;
              delete obj.createdAt;
              delete obj.updatedAt;
              dataMapping.push(obj);
            }
          });

          if (dataMapping.length != 0) {
            this.dataSet = dataMapping;
            this.headers = ['Model', 'Biz Segment', 'Process'];
            for (const key in dataMapping[0]) {
              if (key.includes('-')) {
                this.headers.push(key);
              }
            }
          }

          // สถานะหลังประมวลผลเสร็จสิ้น
          statusMessage.innerText = "ประมวลผลสำเร็จ!";
        }).catch((error: any) => {
          // กรณีเกิดข้อผิดพลาด
          statusMessage.innerText = "เกิดข้อผิดพลาดในการประมวลผลไฟล์: " + error.message;
        });
      };

      reader.onerror = () => {
        statusMessage.innerText = "ไม่สามารถอ่านไฟล์ได้!";
      };

      reader.readAsArrayBuffer(file);
    }
  }
  conditionLoading() {
    let statusMessage: any = document.getElementById('statusMessage')
    if (statusMessage?.innerText == 'ประมวลผลสำเร็จ!' || statusMessage?.innerText == 'กรุณาเลือกเดือนและไฟล์เพื่ออัปโหลด') {
      return false
    }
    return true
  }
  // upload(e: any) {
  //   let files = e.target.files;
  //   if (files?.length != 0) {
  //     const file = files[0];
  //     let reader = new FileReader();

  //     reader.onload = (event: any) => {
  //       const data = new Uint8Array(event.target.result);
  //       const wb = new Exceljs.Workbook();
  //       wb.xlsx.load(data).then(() => {
  //         const ws = wb.getWorksheet('Delivery');
  //         let dataMapping: any = []
  //         let totalTarget: any
  //         ws?.getRow(7).eachCell((cell: Exceljs.Cell, i_cell: number) => {
  //           if (cell.value == 'Total') {
  //             totalTarget = {
  //               row: cell.row,
  //               col: cell.col
  //             }
  //           }
  //         })
  //         ws?.getColumn(2).eachCell((cell: Exceljs.Cell, i_cell: number) => {
  //           if (
  //             this.models.some((model: any) => model.Model == cell.value)
  //           ) {
  //             const modelRef = this.models.find((model: any) => model.Model == cell.value)
  //             const estimateCell = ws.getCell(cell.row + 1, totalTarget.col)
  //             const actualCell = ws.getCell(cell.row + 2, totalTarget.col)
  //             const year = moment(this.month).format('YYYY')
  //             const month = moment(this.month).format('MMM')
  //             const estMonth = `est-${month}`
  //             const actMonth = `act-${month}`
  //             const obj = {
  //               ...modelRef,
  //             }
  //             obj[estMonth] = this.convertValue(estimateCell.value)
  //             obj[actMonth] = this.convertValue(actualCell.value)
  //             obj.year = year
  //             delete obj._id
  //             delete obj.createdAt
  //             delete obj.updatedAt
  //             dataMapping.push(obj)
  //           }
  //         })
  //         if (dataMapping.length != 0) {
  //           this.dataSet = dataMapping
  //           this.headers = ['Model', 'Biz Segment', 'Process']
  //           for (const key in dataMapping[0]) {
  //             if (key.includes('-')) {
  //               this.headers.push(key)
  //             }
  //           }
  //         }

  //       });
  //     };

  //     reader.readAsArrayBuffer(file);
  //   }
  // }
  private convertValue(value: any) {
    if (!isNaN(Number(value))) {
      return value
    }
    if (value.result) {
      return value.result
    }
    return 0
  }

  decreaseMonth() {
    if (this.month) {
      this.month = moment(this.month).clone().subtract(1, 'month').toDate()
    } else {
      this.month = moment().clone().subtract(1, 'month').toDate()
    }
  }
  increaseMonth() {
    if (this.month) {
      this.month = moment(this.month).clone().add(1, 'month').toDate()
    } else {
      this.month = moment().clone().add(1, 'month').toDate()
    }
  }
  async submit() {
    try {
      this.$loader.start()
      await lastValueFrom(this.$shipment.createOrUpdate(this.dataSet))
      this.dataSet = []
      this.headers = []
      let statusMessage: any = document.getElementById('statusMessage')
      if (statusMessage) {
        statusMessage.innerText = 'กรุณาเลือกเดือนและไฟล์เพื่ออัปโหลด'
      }
    } catch (error) {
      this.$loader.stopAll()
      console.log("🚀 ~ error:", error)
    } finally {
      this.$loader.stopAll()
      this.$alert.success()
    }
  }
}
