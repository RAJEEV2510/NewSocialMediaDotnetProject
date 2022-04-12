import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }




  updateUserRoles(userName, roles) {
    return this.http.get(this.baseUrl + 'admin/edit-roles/' + userName + '?roles=' + roles, {});
  }



  getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/users-with-roles');
  }

}
