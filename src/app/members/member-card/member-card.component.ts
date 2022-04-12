import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/InterFaces/member';
import { AccountService } from 'src/app/Services/account.service';
import { MemberService } from 'src/app/Services/member.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  @Input() member: any;
  constructor(private accountService: AccountService, private memberService: MemberService, private toastrService: ToastrService) { }

  ngOnInit(): void {

  }

  addLike(member: Member) {
    this.memberService.addLike(this.member.userName).pipe(
      take(1)).subscribe(() => {
        console.log("Hellow")
        this.toastrService.success("You have liked Liked");
      }, error => {
        if (error.status != 400)
          this.toastrService.success(error.error.text);
      })
  }

}
