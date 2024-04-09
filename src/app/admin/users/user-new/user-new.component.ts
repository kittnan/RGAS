import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { HttpUsersService } from 'src/app/https/http-users.service';
import { SweetAlertGeneralService } from 'src/app/services/sweet-alert-general.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  corporateOption: any[] = [
    {
      name: 'AMT',
      value: "amt"
    },
    {
      name: 'DST',
      value: "dst"
    },
    {
      name: 'ADT',
      value: "adt"
    },
  ]

  accessOption: any[] = [

    {
      name: 'Guest',
      value: "guest"
    },
    {
      name: 'Operator',
      value: "operator"
    },
    {
      name: 'Engineer',
      value: "engineer"
    },
    {
      name: 'SectionHead',
      value: "sectionHead"
    },
    {
      name: 'Interpreter',
      value: "interpreter"
    },
    {
      name: 'DepartmentHead',
      value: "departmentHead"
    },
    {
      name: 'Admin',
      value: "admin"
    },
  ]
  userForm = new FormGroup({
    employeeCode: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    access: new FormControl([], Validators.required),
    corporate: new FormControl(''),
    department: new FormControl(''),
    sectionName: new FormControl(''),
    sectionCode: new FormControl(''),

  })
  constructor(
    private router: Router,
    private $user: HttpUsersService,
    private $alert: SweetAlertGeneralService
  ) { }

  ngOnInit(): void {
    this.userForm.markAllAsTouched()
  }
  onSelected() {

  }
  onSubmit() {
    Swal.fire({
      title: 'Are you prepared to submit?',
      icon: 'question',
      showCancelButton: true
    }).then((v: SweetAlertResult) => {
      if (v.isConfirmed) {
        this.create()
      }
    })

  }
  async create() {
    try {
      await lastValueFrom(this.$user.create(this.userForm.value))
      this.$alert.success(true)
    } catch (error) {
      console.log("🚀 ~ error:", error)
    }
  }
  onClickUserManage() {
    this.router.navigate(['admin/users-manage'])
  }


}
