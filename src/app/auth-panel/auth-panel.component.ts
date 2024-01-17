import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-panel',
  templateUrl: './auth-panel.component.html',
  styleUrls: ['./auth-panel.component.scss']
})
export class AuthPanelComponent {
  public loading = false;
  drop =false;
  user!: SocialUser;
  msalBroadcastService: any;
  loggedIn!: boolean;
  errMsg = '';
  hide = true;
  public signInForm!: FormGroup;
  public signUpForm!: FormGroup;
  constructor(
    readonly builder: FormBuilder,
    private authService: SocialAuthService,
    private service :AuthService,
    // private msalService: MsalService,
    private http: HttpClient,
    private toast: NgToastService,
    private route:Router
  ) {
    this.signInForm = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
          Validators.required,
        ],
      ],
    });

    this.signUpForm = this.builder.group({
      name: this.builder.group({
        fName: [
          '',
          [
            Validators.minLength(1),
            Validators.maxLength(20),
            Validators.required,
          ],
        ],
        lName: [
          '',
          [
            Validators.minLength(1),
            Validators.maxLength(20),
            Validators.required,
          ],
        ],
      }),
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/),
          Validators.required,
        ],
      ],
      isAgreed: [],
    });
  }

  // get the signInPassword for error checking
  get signInpassword() {
    return this.signInForm.get('password');
  }

  // get the signupPassword for error checking
  get signUpPassword() {
    return this.signUpForm.get('password');
  }


  ngOnInit() {

    this.authService.authState.subscribe((user) => {
console.log(user);

      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        
        this.service.googleLogIn(user).subscribe({
          next: res => {
            console.log(res,"response");
            this.toast.success({ detail: 'Success', summary: 'Login Suceessfull' })
          },
          error: err => {
            console.log(err,"Error");
            this.toast.error({ detail: 'Error', summary: err.message })
          }

        })
      }
      
    });
   
  }

  microsoftLogin() {
    // this.msalService.instance.loginPopup({
    //   scopes: ["User.Read"],
    // }).then((res: AuthenticationResult) => {
    //   console.log(res);
      
    // });
    
  }



  onSubmit() {
    this.loading = true;
    if (!this.drop) {
      const signInObj = {
        email: this.signInForm.value.email,
        password:this.signInForm.value.password
      }
      this.service.loginUser(signInObj).subscribe({
        next: (res:any) => {
          console.log(res, "Res from the server");
          localStorage.setItem('token', res.token);
        this.toast.success({ detail: 'Success', summary: 'Successfully Loged in' });
          this.resetForm('signIn');
          this.loading = false;
          this.route.navigate(['/home']);

        },
        error: (err) => {
          console.log(err, "Error");
        this.toast.error({ detail: 'Error', summary: "Invalid Credential" });

          this.loading = false;
        }
     })
      return;
      
    }
    const obj = {
      firstName: this.signUpForm.value.name.fName,
      lastName: this.signUpForm.value.name.lName,
      email: this.signUpForm.value.email,
      password:this.signUpForm.value.password
    }
    this.service.registerUser(obj).subscribe({
      next: (res) => {
        console.log(res, "Response");
        this.toast.success({ detail: 'Success', summary: 'Successfully Registered' });
        this.resetForm('signUp')
        this.loading = false;
      },
      error: err => {
        
        console.log(err.status, "Error");
        if (err.status === 400) {
        this.toast.error({ detail: 'Error', summary: "User already Exist. Please login" });

          this.drop = !this.drop;

        }
        else this.toast.error({ detail: 'Error', summary: err.error });
        this.loading = false;
      }
    })
    // this.http.post('https://j7zbx560-3000.asse.devtunnels.ms/auth/register', obj).subscribe((res:any)=> {
    //   if (res.success) {
    //     this.loading = false;
    //     this.toast.success({ detail: 'Success', summary: 'SignUp successfull' })
    //     this.resetForm('signIn');
    //     this.drop = !this.drop;

    //   }
    //   else {
    //     this.loading = false;
    //     this.errMsg = res.msg;
    //     this.toast.error({detail:'Error',summary:this.errMsg})
    //   }
      
    // })
  }

  resetForm(form:string) {
    form === 'signUp' ? this.signUpForm.reset() : this.signInForm.reset();
  }
}
