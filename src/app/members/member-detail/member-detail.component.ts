import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/InterFaces/member';
import { AccountService } from 'src/app/Services/account.service';
import { MemberService } from 'src/app/Services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, AfterViewInit {

  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  photoUrl: string = "";
  chats: any = []
  receiverUserName: string = "";
  constructor(private memberService: MemberService, private route: ActivatedRoute, private accountService: AccountService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.loadMember();



    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }

    ]

  }

  getImages() {
    const imageUrl = [];
    for (var i = 0; i < this.member?.photos?.length; i++) {
      imageUrl.push({
        small: this.member.photos[i]?.url,
        medium: this.member.photos[i]?.url,
        big: this.member.photos[i]?.url
      })
    }
    return imageUrl;

  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe((data) => {
      this.member = data;
      this.photoUrl = this.member.photoUrl;
      this.galleryImages = this.getImages()
      this.receiverUserName = this.member.userName;

    })

  }

  ngAfterViewInit() {

  }

  getMessageForMember() {
    this.memberService.getMessageForMember(this.member.userName).subscribe((data) => {
      console.log(data);
      this.chats = data;
    })
  }


}
