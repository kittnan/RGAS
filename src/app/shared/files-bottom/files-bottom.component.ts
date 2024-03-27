import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { lastValueFrom } from 'rxjs';
import { HttpClaimService } from 'src/app/https/http-claim.service';
import { HttpFileUploadService } from 'src/app/https/http-file-upload.service';
import { HttpReportService } from 'src/app/https/http-report.service';
import { HttpResultService } from 'src/app/https/http-result.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-files-bottom',
  templateUrl: './files-bottom.component.html',
  styleUrls: ['./files-bottom.component.scss']
})
export class FilesBottomComponent implements OnInit {

  @Input() files: any[] = []
  filesLen: number = 0
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private $file: HttpFileUploadService,
    private $claim: HttpClaimService,
    private $result: HttpResultService,
    private $report: HttpReportService,
    private $alert: SweetAlertGeneralService
  ) { }

  ngOnInit(): void {
    try {
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onDownload(item: any) {
    this.openLink(item.path)
  }
  openLink(url: string) {
    window.open(url, '_blank');
  }
  async onDelete(item: any) {

    if (this.data.type == 'claim') {
      this.data.files = this.data.files.filter((file: any) => file.delete_path != item.delete_path)
      let dataUpdate = this.data.form
      dataUpdate.files = this.data.files
      await lastValueFrom(this.$claim.createOrUpdate(dataUpdate))
      await lastValueFrom(this.$file.delete({ path_file: item.delete_path }))
      this.$alert.success()
    }
    if (this.data.type == 'result') {
      this.data.files = this.data.files.filter((file: any) => file.delete_path != item.delete_path)
      let dataUpdate = this.data.form
      dataUpdate[this.data.key].files = this.data.files
      await lastValueFrom(this.$result.createOrUpdate([dataUpdate]))
      await lastValueFrom(this.$file.delete({ path_file: item.delete_path }))
      this.$alert.success()
    }
    if (this.data.type == 'report') {
      this.data.files = this.data.files.filter((file: any) => file.delete_path != item.delete_path)
      let dataUpdate = this.data.form
      dataUpdate.files = this.data.files
      await lastValueFrom(this.$report.createOrUpdate([dataUpdate]))
      await lastValueFrom(this.$file.delete({ path_file: item.delete_path }))
      this.$alert.success()
    }

  }
  onView(item: any) {

  }
}
