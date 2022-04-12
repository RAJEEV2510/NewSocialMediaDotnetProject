import { Component, OnInit } from '@angular/core';
import { Member } from '../InterFaces/member';
import { MemberService } from '../Services/member.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  constructor(private memberService: MemberService) { }
  members: Partial<Member[]>;
  predicate: string = 'liked';


  ngOnInit(): void {
    this.loadList(this.predicate);
  }

  loadList(predicate: string) {
    this.predicate = predicate;
    this.memberService.getLikes(this.predicate).subscribe((data) => {
      this.members = data;
      console.log(this.members)
    })
  }
}
