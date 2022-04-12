import { Component, OnInit } from '@angular/core';
import { Pagination } from '../InterFaces/Pagination';
import { MessageService } from '../Services/message.service';
import { Message } from '../_models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  container: string = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages(container?: string) {
    this.container = container;
    this.messageService.getMessages(this.pageNumber, this.pageSize, container ? container : this.container).subscribe((data: any) => {
      this.messages = data.result;
      this.pagination = data.pagination;
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages(this.container);
  }
}
