import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  id?: string;
  idToken?: string;
  name?: string;
  photoUrl?: string;
  provider?: string;
}

interface Credential{
  email: string,
  password:string
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  googleLogIn(user: User) {
    return this.http.post(`${environment.API_URL}/auth/google`, {
      firstName: user.firstName,
      lastName:user.lastName,
      email: user.email,
    } );
  }

  registerUser(userData: User) {
    return this.http.post(`${environment.API_URL}/auth/register`, userData);
  }

  loginUser(credential: Credential) {
    return this.http.post(`${environment.API_URL}/auth/login`, credential);   
  }

  forgotPassword(email: string) {
    return this.http.post(`${environment.API_URL}/auth/forgot`, {
      email
    });
  }

  otpVerify(otp: string) {
    return this.http.post(`${environment.API_URL}otp`, {
      otp
    })
  }

  resetPassword(otp: string | null, password: string) {
    return this.http.post(`${environment.API_URL}reset`, {
      otp,
      password
    })
  }

}
