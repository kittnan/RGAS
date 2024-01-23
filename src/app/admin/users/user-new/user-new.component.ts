import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    access: new FormControl([], Validators.required),
    corporate: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    sectionName: new FormControl('', Validators.required),
    sectionCode: new FormControl('', Validators.required),

  })
  constructor(
    private router: Router
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
        alert('submit')
      }
    })

  }
  onClickUserManage() {
    this.router.navigate(['users/manage'])
  }


}
