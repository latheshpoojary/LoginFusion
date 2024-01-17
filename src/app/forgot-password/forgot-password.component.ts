import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  loading = false;
  OTPForm!: FormGroup;
  forgotForm!: FormGroup;
  isForgotPassword = true;
  timeRemaining = 60; // Initial time in seconds
  timeInterval: any;
  isTimeElapsed = false;
  OTPtimeFormat = '';

  @ViewChild('resendOTP', { static: false }) resendOTPRef!:ElementRef ;

  constructor(private service: AuthService, private toast: NgToastService,private router:Router) {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.OTPForm = new FormGroup({
      otp: new FormControl('', [Validators.required,Validators.minLength(4)]),
    });
  }
  email!: FormControl;
  // email = new FormControl();

  sendOTP(from:string) {
    console.log(this.forgotForm.value.email);
    this.loading = true;
    
    if (this.forgotForm.value.email) {
      this.service.forgotPassword(this.forgotForm.value.email).subscribe({
        next: (res) => {
          this.loading = false;
          this.toast.success({
            detail: 'Success',
            summary: 'OTP Send to your email',
          });
          this.isForgotPassword = false;
          if (from === 'resend') {
            this.resendOTPRef.nativeElement.style.display = 'none';
            this.clearTimer();
          } 
          this.isForgotPassword = false;
          this.startTimer();

        },
        error: (err) => {
          this.loading = false;
          this.toast.error({
            detail: 'Error',
            summary: 'Something went wrong',
          });
          console.log(err);
        },
      });
    }
  }

  verifyOTP() {
    this.loading = true;
    if (this.OTPForm.value.otp) {
      this.service.otpVerify(this.OTPForm.value.otp).subscribe({
        next: (res) => {
          this.loading = false;
          this.toast.success({
            detail: 'Success',
            summary: 'OTP Verified Successfully',
          });
          sessionStorage.setItem("OTP", this.OTPForm.value.otp);
          this.router.navigate(['/reset']);
          console.log(res);
        },
        error: (err) => {
          this.loading = false;
          this.toast.error({
            detail: 'Error',
            summary: 'Invalid OTP',
          });
          console.log(err);
        }
      })
    }
  }

  


  startTimer() {
    console.log("came here");
    
    this.updateTimerDisplay();

    this.timeInterval = setInterval(() => {
      this.timeRemaining--;

      if (this.timeRemaining >= 0) {
        this.updateTimerDisplay();
      } else {
        clearInterval(this.timeInterval);
        this.isTimeElapsed = true;
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;

    // Use padStart to ensure two digits with leading zeros
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
    console.log(this.OTPtimeFormat);
    
    this.OTPtimeFormat = formattedTime;
  }

  clearTimer() {
    clearInterval(this.timeInterval);
    this.timeRemaining = 60;
    this.isTimeElapsed = false;
    
  }
}
