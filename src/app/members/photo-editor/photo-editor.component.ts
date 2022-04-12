import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/InterFaces/member';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/';
import { environment } from 'src/environments/environment';
import { MemberService } from 'src/app/Services/member.service';
import { AccountService } from 'src/app/Services/account.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  @Input() member: Member;
  baseUrl = environment.apiUrl;


  constructor(private memberService: MemberService, private accountService: AccountService, private toastr: ToastrService) {
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }



  ngOnInit(): void {
    this.initializerUploader();

  }

  setMainPhoto(photoId: Number) {
    this.memberService.setMainPhoto(photoId).subscribe((res: any) => {
      this.accountService.changePhotoUrl.next(res.url);
    })
  }


  initializerUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024

    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);

      }
    }
  }


  deletePhoto(id: Number) {
    this.memberService.deletePhoto(id).subscribe(() => {
      this.member.photos.splice(this.member.photos.findIndex(p => p.id === id), 1);
      this.toastr.success('Photo Deleted Successfully', 'Success');

    })
  }

}
