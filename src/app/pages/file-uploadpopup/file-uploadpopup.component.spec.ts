import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadpopupComponent } from './file-uploadpopup.component';

describe('FileUploadpopupComponent', () => {
  let component: FileUploadpopupComponent;
  let fixture: ComponentFixture<FileUploadpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadpopupComponent]
    });
    fixture = TestBed.createComponent(FileUploadpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
