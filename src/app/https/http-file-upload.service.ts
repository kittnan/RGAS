import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpFileUploadService {

  private fileServer = environment.fileServer;
  private fileServerDelete = environment.fileServerDelete;
  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(`${this.fileServer}`, data);
  }
  delete(data: any): Observable<any> {
    return this.http.post(`${this.fileServerDelete}`, data);
  }

}
