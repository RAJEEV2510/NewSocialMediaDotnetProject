import { Component, Input, OnInit } from '@angular/core';
import { MemberService } from 'src/app/Services/member.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input('Chats') chats: any = [];
  @Input('receiverUserName') receiverUserName: string = "";
  userName: string = JSON.parse(localStorage.getItem("user")).userName;
  MessageSentToUser: "";
  constructor(private memberService: MemberService) {

  }

  ngOnInit(): void {
  }

  sendMessage() {


    this.memberService.sendMessageToUser(this.receiverUserName, this.MessageSentToUser).subscribe(message => {
      this.chats.push(message);
      this.MessageSentToUser = "";
    })


  }
}
