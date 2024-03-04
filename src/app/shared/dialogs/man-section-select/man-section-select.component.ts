import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpUsersService } from 'src/app/https/http-users.service';

@Component({
  selector: 'app-man-section-select',
  templateUrl: './man-section-select.component.html',
  styleUrls: ['./man-section-select.component.scss']
})
export class ManSectionSelectComponent implements OnInit {

  sendTo: any
  userApproveClaimOption: any
  constructor(
    private $user: HttpUsersService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) {
    this.$user.get(new HttpParams().set('access', JSON.stringify(['sectionHead']))).subscribe((resData: any) => {
      this.userApproveClaimOption = resData
      this.sendTo = this.data
    })
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.dialogRef.close(this.sendTo)
  }
  onClose(){
    this.dialogRef.close(null)
  }
  // todo show user login name
  displayName(user: any) {
    if (user) {
      return user.name
    }
    return ''
  }

}
