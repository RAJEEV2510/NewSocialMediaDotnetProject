import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/InterFaces/member';
import { Pagination } from 'src/app/InterFaces/Pagination';
import { AccountService } from 'src/app/Services/account.service';
import { MemberService } from 'src/app/Services/member.service';
import { UserParams } from 'src/app/_models/userParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[] = [];
  pagination: Pagination;
  userParams: UserParams;
  genderList: any = [{ value: 'female', text: "Female" }, { value: 'male', text: "Male" }]
  intialValueOfGender: string;

  constructor(private memberService: MemberService, private accountService: AccountService) {
    //service used for initializing the variable
    this.accountService.currentUser$.subscribe((user) => {
      this.userParams = new UserParams(user);
      this.intialValueOfGender = this.userParams.gender;

    })
  }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any): void {
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }

  resetGender() {
    this.userParams.gender = this.intialValueOfGender;
    this.loadMembers()

  }
  orderByMember(data) {
    this.userParams.orderBy = data;
    this.loadMembers()
  }

}
