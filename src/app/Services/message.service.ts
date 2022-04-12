import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl;
  message: any;
  constructor(private http: HttpClient) { }


  getMessages(pageNumber, pageSize, container) {

    let params = this.getPaginationHeaders(pageNumber, pageSize, container);
    return this.http.get<any>(this.baseUrl + 'message', { observe: 'response', params }).pipe(map(response => {
      const obj: any = {
        result: response.body,
        pagination: JSON.parse(response.headers.get('Pagination'))
      }
      this.message = obj;
      return this.message;
    }))
  }

  getPaginationHeaders(pageNumber, pageSize, container) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('container', container);
    return params;
  }

}