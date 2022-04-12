import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  @Output() cancelRegister = new EventEmitter();

  model: any = {
    username: "",
    password: "",
    gender: "",
    knownAs: "",
    dateOfBirth: null
  };

  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  register() {

    this.accountService.register(this.model).subscribe(() => {

      this.toastr.success("successfully registered")
      this.cancel()
    }, err => console.log(err.error));


  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
