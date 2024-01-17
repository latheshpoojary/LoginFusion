import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileUploadpopupComponent } from './file-uploadpopup/file-uploadpopup.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    FileUploadpopupComponent,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgToastModule,
    NgxDropzoneModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  
})
export class PagesModule { }
