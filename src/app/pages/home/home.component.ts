import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import { FileUploadpopupComponent } from '../file-uploadpopup/file-uploadpopup.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  animeList:any[] = [];
  files: File[] = [];
  imageUrl!: string;
  constructor(private homeService:HomeService,private dialog:MatDialog,private http:HttpClient) { }
  
  ngOnInit(): void {
    this.getAnimeList();
  }
  onSelect(event: any) {
    console.log("called");
    
    this.files.push(...event.addedFiles);
    console.log(this.files);
    
  }
  onRemove(f:any) {
    this.files.splice(this.files.indexOf(f), 1);
  }

  getAnimeList() {
    this.homeService.getAnime().subscribe({
      next: (res: any) => {
        this.animeList=res;
      }
    })
  }
 

  download(imageUrl: string,filename:string) {
    this.homeService.sendImageURl(imageUrl).subscribe(val => {
      console.log(val,"url from api");
      const url = URL.createObjectURL(val);
      console.log("imageURL:",imageUrl,"/nblob url",url);
      
      this.downloadUrl(url, filename);
      URL.revokeObjectURL(url);
    });
  }

  downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };

  uploadFile() {
    if (this.files[0]) {
      for (let file = 0; file < this.files.length; file++){
        const file_data = this.files[file];
        console.log(file_data);
        
        const clodyConfig = new FormData();
        clodyConfig.append('file', file_data);
        clodyConfig.append('upload_preset', 'anime_upload');
        clodyConfig.append('cloud_name', 'dyuh0eflt');
        console.log(clodyConfig);
        this.http.post('https://api.cloudinary.com/v1_1/dyuh0eflt/image/upload', clodyConfig).subscribe(res => {
          console.log(res);
        })
       
        
        
        // this.homeService.uploadData(body).subscribe(res => {
          
        // })
        
      }
    }
  }

  onUpload() {
    const dialogRef = this.dialog.open(FileUploadpopupComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      this.getAnimeList();
    })
  }


}
