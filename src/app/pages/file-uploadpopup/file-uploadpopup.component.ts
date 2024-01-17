import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-file-uploadpopup',
  templateUrl: './file-uploadpopup.component.html',
  styleUrls: ['./file-uploadpopup.component.scss']
})
export class FileUploadpopupComponent {
  files: File[] = [];
  loading = false;
  public chatacterForm!: FormGroup;
  imageUrl!: string;
  
  constructor(private homeService:HomeService,private fb:FormBuilder,private http:HttpClient,private dialog:DialogRef) {
    this.chatacterForm = this.fb.group({
      name: ['', [Validators.required]],
      skill: ['', [Validators.required]],
    })
  }

  
  onSelect(event: any) {
    console.log("called");
    
    this.files.push(...event.addedFiles);
    console.log(this.files);
    
  }
  onRemove(f:any) {
    this.files.splice(this.files.indexOf(f), 1);
  }

  onUpload() {
    this.loading = true;
    if (this.chatacterForm.valid) {
  console.log(this.files);

      if (this.files[0]) {
        for (let file = 0; file < this.files.length; file++){
          const file_data = this.files[file];
          console.log(file_data);
          
          const clodyConfig = new FormData();
          clodyConfig.append('file', file_data);
          clodyConfig.append('upload_preset', 'anime_upload');
          clodyConfig.append('cloud_name', 'dyuh0eflt');
          console.log(clodyConfig);
          this.http.post('https://api.cloudinary.com/v1_1/dyuh0eflt/image/upload', clodyConfig).subscribe((res:any) => {
            const body = {
              "imageUrl":res.url,
              name: this.chatacterForm.value.name,
              skill:this.chatacterForm.value.skill
            }
            console.log(body);
            
            this.homeService.uploadData(body).subscribe(res => {
              console.log(res);
              this.loading = false;
              this.dialog.close();
            })
        })
          
          
        }
      }
    }
   
  }
}
