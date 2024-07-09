import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class ShowToast {
  constructor(private toastr: ToastrService) { }


  success(message: string | "success") {
    this.toastr.success(message, '', {
      enableHtml: true,
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
      tapToDismiss: false,
      newestOnTop: false
    });
  }

  error(message: string | "error") {
    this.toastr.error(message, '', {
      enableHtml: true,
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
      tapToDismiss: false,
      newestOnTop: false,
    });
  }
}
