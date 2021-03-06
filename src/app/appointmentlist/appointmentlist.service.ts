import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
 import 'rxjs/add/operator/map';
 import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AppointmentlistService {

  constructor(private _http:HttpClient) { }
  
  getAll(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/appointment/getAll');
  }
}
