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
    return this.http.get(`${this.URL}/${this.SUB}`, {
      params: params
    });
  }
  getRgas1(params: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}/getRgas1`, {
      params: params
    });
  }
  createOrUpdate(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/createOrUpdate`, data);
  }
  createSub(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/createSub`, data);
  }
  delete(params: HttpParams): Observable<any> {
    return this.http.delete(`${this.URL}/${this.SUB}`, {
      params: params
    })
  }
}
