import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpClaimService {
  private URL = environment.API;
  private SUB = 'claim'
  constructor(private http: HttpClient) { }

  get(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}`,{
      params:params
    });
  }
  createOrUpdate(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/createOrUpdate`, data);
  }
}
