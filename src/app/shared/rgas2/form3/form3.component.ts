import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FilesBottomComponent } from '../../files-bottom/files-bottom.component';
import { HttpDCdService } from 'src/app/https/http-d-cd.service';
import { HttpLCdService } from 'src/app/https/http-l-cd.service';
import { HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { HttpM1eService } from 'src/app/https/http-m1e.service';
import { HttpPrincipleService } from 'src/app/https/http-principle.service';
import { HttpSCdService } from 'src/app/https/http-s-cd.service';
import { MatDialog } from '@angular/material/dialog';
import { ManSectionSelectComponent } from '../../dialogs/man-section-select/man-section-select.component';
import { HttpReportService } from 'src/app/https/http-report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.scss']
})
export class Form3Component implements OnInit {


  tempOption: any[] = [
    {
      value: '1',
      viewValue: '11111'
    },
    {
      value: '2',
      viewValue: '22222'
    },
  ]

  tempObj = {
    dueDate: null,
    dateSubmitToCustomer: null,
    files: [],

  }

  @Input() form: any = {
    preReport: { ...this.tempObj },
    interims: [
      { ...this.tempObj, index: 1 }
    ],
    finalReport: { ...this.tempObj },
    finalReportOBL: { ...this.tempObj },
    questionAnswers: [
      { ...this.tempObj, index: 1 }
    ],
    ng: null,
    rootCauseActions: [
      {
        value: null,
        date: null,
        index: 1
      }
    ],
    leakCauseActions: [
      {
        value: null,
        date: null,
        index: 1
      }
    ],
  }

  // todo d-cd option
  dcdOption: any = []
  // todo d-cd column B option
  defectPhenomenonOption: any = []
  // todo d-cd column C option
  detailedPhenomenonOption: any = []
  // todo d-cd column D option
  causeOption: any = []

  // todo m1eOption column B option
  m1eOption: any = []
  // todo m1eOption defect detail column C option
  m1eDefectDetailOption: any = []
  // todo m1eOption defect cause column C option
  m1eCauseDetailOption: any = []

  // todo principle option
  principleOption: any = []
  occurrenceOption: any = []
  principleCOption: any = []

  lcdOption: any = []
  lcdBOption: any = []
  lcdCOption: any = []

  scdOption: any = []
  scdCOption: any = []

  @Output() reportChange: EventEmitter<any> = new EventEmitter()

  constructor(
    private _bottomSheet: MatBottomSheet,
    private $d_cd: HttpDCdService,
    private $l_cd: HttpLCdService,
    private $s_cd: HttpSCdService,
    private $m1e: HttpM1eService,
    private $principle: HttpPrincipleService,
    private dialog: MatDialog,
    private $report: HttpReportService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      const resDcd = await lastValueFrom(this.$d_cd.get(new HttpParams()))
      this.dcdOption = resDcd.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.defectPhenomenonOption = [...new Set(resDcd.map((item: any) => item['Defect Phenomenon']))]
      this.detailedPhenomenonOption = [...new Set(resDcd.map((item: any) => item['Detailed phenomenon']))]
      this.causeOption = [...new Set(resDcd.map((item: any) => item['Cause']))]

      const resM1e = await lastValueFrom(this.$m1e.get(new HttpParams()))
      this.m1eOption = resM1e.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.m1eDefectDetailOption = [...new Set(resM1e.map((item: any) => item['Cause']))]
      this.m1eCauseDetailOption = [...new Set(resM1e.map((item: any) => item['5M code']))]

      const resPrinciple = await lastValueFrom(this.$principle.get(new HttpParams()))
      this.principleOption = resPrinciple.map((item: any, i: number) => {
        item.no = 'principle' + i + 1
        return item
      })
      this.occurrenceOption = [...new Set(resPrinciple.map((item: any) => item['Outflow cause(Leak cause)']))]
      this.principleCOption = [...new Set(resPrinciple.map((item: any) => item['Total code']))]

      const resLcd = await lastValueFrom(this.$l_cd.get(new HttpParams()))
      this.lcdOption = resLcd.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.lcdBOption = [...new Set(resLcd.map((item: any) => item['Occurrence process category details']))]
      this.lcdCOption = [...new Set(resLcd.map((item: any) => item['Occurrence process CD']))]


      const resScd = await lastValueFrom(this.$s_cd.get(new HttpParams()))
      this.scdOption = resScd.map((item: any, i: number) => {
        item.no = 'dcdOption' + i + 1
        return item
      })
      this.scdCOption = [...new Set(resScd.map((item: any) => item['取引先名']))]



    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }

  onAddNewInterim() {
    this.form.interims.push({ ...this.tempObj, index: this.form.interims.length + 1 })
  }
  onAddNewQuestionAnswer() {
    this.form.questionAnswers.push({ ...this.tempObj, index: this.form.questionAnswers.length + 1 })
  }
  onAddNewRootCauseAction() {
    this.form.rootCauseActions.push({
      value: null,
      date: null,
      index: this.form.rootCauseActions.length + 1
    })
  }
  onAddNewLeakCauseAction() {
    this.form.leakCauseActions.push({
      value: null,
      date: null,
      index: this.form.leakCauseActions.length + 1
    })
  }

  // todo form html fn
  public objectComparisonFunction = function (option: any, value: any): boolean {
    if (option._id && value._id)
      return option._id === value._id;
    return false
  }

  // todo open file bottom
  openBottom(files: any) {
    this._bottomSheet.open(FilesBottomComponent, {
      data: files
    })
  }

  // todo control badge number
  controlBadgeNumber(files: any) {
    if (!files) return null
    if (files && files.length < 1) return null
    return files.length
  }

  // todo upload file
  async onUploadFile($event: any, key: string) {
    try {

      let file: any = $event.target.files[0] as File;
      console.log("🚀 ~ file:", file)

    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }


  onSubmitPreReport() {
    // console.log(this.form.preReport);
    // const dialog = this.dialog.open(ManSectionSelectComponent, {
    //   disableClose: true
    // }).afterClosed().subscribe((data: any) => {
    //   console.log(data);
    //   if (data) {
    //     this.reportChange.emit({
    //       action: 'preReport',
    //       data: {
    //         ...this.form.preReport,
    //         sendTo: data
    //       }
    //     })
    //   }

    // })
    this.reportChange.emit(this.form.preReport)
  }

  // todo show user login name
  displayName(user: any) {
    if (user) {
      let firstName = user.firstName ? user.firstName : ''
      let lastName = user.lastName ? user.lastName[0] : ''
      return `${firstName}-${lastName}`
    }
    return ''
  }

}
