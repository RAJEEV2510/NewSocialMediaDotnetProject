import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/InterFaces/member';
import { User } from 'src/app/InterFaces/User';
import { AccountService } from 'src/app/Services/account.service';
import { MemberService } from 'src/app/Services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: any;
  member: Member;

  //access the browser event
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  @ViewChild('editForm') editForm: NgForm;
  constructor(private accountService: AccountService, private memberService: MemberService, private toastr: ToastrService) {
    this.accountService.currentUser$.subscribe(data => {
      this.user = data
    })
  }


  ngOnInit(): void {
    this.loadMember();
    this.accountService.changePhotoUrl.subscribe((photoUrl) => {
      this.member.photoUrl = photoUrl
    })
  }

  loadMember() {
    this.memberService.getMember(this.user.userName).subscribe((data) => {
      this.member = data

    })


  }

  updateMember() {
    console.log(this.member)
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Member Updated Successfully', 'Success');
      this.editForm.resetForm(this.member);
    })

  }






}
