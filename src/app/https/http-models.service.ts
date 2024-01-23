import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpModelsService {

  private URL = environment.API;
  private SUB = 'models'
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(`${this.URL}/${this.SUB}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/create`, data);
  }
  import(data: any): Observable<any> {
    return this.http.post(`${this.URL}/${this.SUB}/import`, data);
  }
  update(data: any): Observable<any> {
    return this.http.put(`${this.URL}/${this.SUB}/update`, data);
  }
}
