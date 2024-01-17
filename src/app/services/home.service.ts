import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAnime() {
    return this.http.get(`${environment.API_URL}/naruto`);
  }

  uploadData(formData: any) {
   
    console.log(formData);
    
    return this.http.post(`${environment.API_URL}/naruto`, formData)
        
   
  }

  sendImageURl(imageURL:string) {
    return this.http.get(imageURL, { responseType: 'blob' });
  }

  

}
