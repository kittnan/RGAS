import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpMailService {

  private URL = environment.API;
  private SUB = 'mail'
  constructor(private http: HttpClient) { }

  send(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/send`,data);
  }
}
