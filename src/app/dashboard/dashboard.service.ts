import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
 import 'rxjs/add/operator/map';
 import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  headers = new Headers();
  constructor(private _http:HttpClient) { 

  }
  getData(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/user/getdoctors');
  }

}