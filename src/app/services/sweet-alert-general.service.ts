import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertGeneralService {

  constructor() { }

  success(reload: boolean = false) {
    Swal.fire({
      title: 'Success',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      if (reload) location.reload()
    })
  }
  danger(msg: string = 'error') {
    Swal.fire({
      title: msg,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
