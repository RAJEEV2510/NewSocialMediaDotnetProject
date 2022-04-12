import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../InterFaces/User';
import { AccountService } from '../Services/account.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberService } from '../Services/member.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService, private memberService: MemberService) { }

  model: any = {
    username: "",
    password: ""
  }
  photoUrl: string = ""


  ngOnInit(): void {
    this.photoUrl = JSON.parse(localStorage.getItem("user"))?.userPic
    this.model.username = JSON.parse(localStorage.getItem("user")).userName
    this.accountService.changePhotoUrl.subscribe((photoUrl) => {
      const user = JSON.parse(localStorage.getItem("user"));
      user.userPic = photoUrl;
      localStorage.setItem("user", JSON.stringify({ ...user }))
      this.photoUrl = photoUrl;

    })
  }

  //login
  login() {
    this.accountService.login(this.model).subscribe((data: any) => {
      this.photoUrl = ""
      console.log(data)
      this.model.username = data?.userName
      console.log(this.model)
      this.router.navigateByUrl("/members")
      this.toastr.success("succesFully Login")
      this.photoUrl = JSON.parse(localStorage.getItem("user")).userPic
    }, err => {
      // this.toastr.error(err.error)
    })
  }

  //logut
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/")
    this.toastr.success("Logout Successfully")

  }



}
