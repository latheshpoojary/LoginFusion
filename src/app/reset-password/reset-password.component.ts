import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetForm!: FormGroup;

  constructor(private service:AuthService,private toast: NgToastService,private route:Router) {
    this.resetForm = new FormGroup({
      password:new FormControl('',[
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
        Validators.required,
      ]),
      confirm_password: new FormControl('',[
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
        Validators.required,
      ])
    })
    this.resetForm.setValidators(this.validatePassword);
  }

  onSubmit() {
    
    if (this.resetForm.valid) {
      const otp = sessionStorage.getItem('OTP');
      this.service.resetPassword(otp, this.resetForm.value.password).subscribe({
        next: (res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Password reset Successfully',
          });
          this.route.navigate(['/login']);
          
        },
        error: (err) => {
          this.toast.error({
            detail: 'Error',
            summary: 'Something went wrong',
          });
          console.log(err);
          
        }
      })
      
    }
    
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm_password = control.get('confirm_password')?.value;
    if (password !== confirm_password) {
      return { lessThanStart: true };
    }
    // Making the meeting gap atleast 5 minute(future implementation)

    // if ((endTime - startTime) < 1000 * 60 * 5) {
    //   console.log(endTime - startTime < 1000 * 5);

    //   return { lessThan5Min: true };
    // }
    return null;
  }
}
