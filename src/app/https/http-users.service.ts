import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {
  private URL = environment.API;
  private SUB = 'users'
  constructor(private http: HttpClient) { }

  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}`, { params: params });
  }
  userNextApprove(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/userNextApprove`, { params: params });
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/login`, data);
  }
  create(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/create`, data);
  }
  update(data: any): Observable<any> {
    return this.http.put(`${this.URL}/${this.SUB}/update`, data);
  }
}
