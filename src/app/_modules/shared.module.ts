import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    }),
    FileUploadModule,
    PaginationModule
  ],
  exports: [ToastrModule, FileUploadModule, PaginationModule]

})

export class SharedModule { }
