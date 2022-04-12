import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../InterFaces/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  changePhotoUrl = new ReplaySubject<string>(1);
  currentUser$ = this.currentUserSource.asObservable();

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(map((response: User) => {
      let user = response;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(user.token));
        this.currentUserSource.next(user);
      }
      this.setCurrentUser(user);
      return user;
    }))

  }
  constructor(private http: HttpClient) { }

  //current User
  setCurrentUser(user: User) {

    if (user) {
      user.roles = []
      var roles = this.decodeToken(localStorage.getItem("token")).role;
      Array.isArray(roles) ? user['roles'] = roles : user.roles.push(roles);
    }
    this.currentUserSource.next(user);

  }


  //register
  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(map((response: User) => {
      let user = response;
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        this.currentUserSource.next(user);
      }
      return user;
    }))

  }
  //logout
  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  //decode token
  decodeToken(token) {

    console.log(JSON.parse(atob(localStorage.getItem('token').split('.')[1])))
    return JSON.parse(atob(localStorage.getItem('token').split('.')[1]));
  }
}
