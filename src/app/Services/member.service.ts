import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../InterFaces/member';
import { PaginatedResult } from '../InterFaces/Pagination';
import { UserParams } from '../_models/userParams';


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  baseUrl = environment.apiUrl;
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();//object initializer
  memberCache: any = {}

  constructor(private http: HttpClient) { }


  //get members
  getMembers(userParms: UserParams) {

    //get pagination Headers
    let params = this.getHeaders(userParms);
    var response = this.memberCache[Object.values(userParms).join('-')];
    if (response) {
      return of(response);
    }

    return this.http.get<any>(this.baseUrl + 'users', { observe: 'response', params }).pipe(map(response => {
      this.paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      const obj: any = {
        result: response.body,
        pagination: JSON.parse(response.headers.get('Pagination'))
      }
      this.memberCache[Object.values(userParms).join('-')] = obj;
      return this.paginatedResult;
    }))
  }

  //get  paginationHeaders
  private getHeaders(userParms: UserParams) {
    let params = new HttpParams();
    params = params.append('pageNumber', userParms.pageNumber.toString());
    params = params.append('pageSize', userParms.pageSize.toString());
    params = params.append('gender', userParms.gender);
    params = params.append('orderBy', userParms.orderBy);

    return params;
  }


  //get member
  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  //update member
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member);
  }

  //set main photo
  setMainPhoto(id: Number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + id, {});

  }

  //add Like
  addLike(userName: string) {
    return this.http.post(this.baseUrl + 'like/' + userName, {});
  }

  //get likes 
  getLikes(predicate: string) {
    return this.http.get<Partial<Member[]>>(this.baseUrl + 'like?predicate=' + predicate);
  }

  //get messages for two users
  getMessageForMember(receiverUserName) {
    return this.http.get<Partial<Member[]>>(this.baseUrl + 'message/thread/' + receiverUserName);
  }


  //delete Photo
  deletePhoto(id: Number) {
    return this.http.delete(this.baseUrl + 'users/photo-delete/' + id);
  }

  //send Message to user
  sendMessageToUser(receiverUserName: string, message: string) {
    return this.http.post(this.baseUrl + 'message', { RecipientUsername: receiverUserName, content: message });
  }
}
