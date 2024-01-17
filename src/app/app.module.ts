import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AuthPanelComponent } from './auth-panel/auth-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
//
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { NgToastModule } from 'ng-angular-popup';
import { NgxLoadingModule } from 'ngx-loading';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthInterceptor } from './auth.interceptor';
// export function MSALInstanceFactory():IPublicClientApplication{
//   return new PublicClientApplication({
//     auth:{
//       clientId:'a0ea4061-3a36-4b74-a0e2-46cc41982221',
//       redirectUri:'http://localhost:4200',
//       authority: '887aa0fa-80f4-4405-b6f0-91b25cfe11c0'
//     }
//   })
// }

@NgModule({
  declarations: [AppComponent, AuthPanelComponent, ForgotPasswordComponent, ResetPasswordComponent,],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    // MsalModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgxLoadingModule.forRoot({}),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '4327640465-33ug6nijmjov0h4skdio96l47r79a2am.apps.googleusercontent.com'
            ),
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  
      {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi:true
     }
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
