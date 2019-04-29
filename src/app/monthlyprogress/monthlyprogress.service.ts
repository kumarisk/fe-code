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
export class MonthlyprogressService {

  constructor(private _http:HttpClient) { }
  // Overall List
  getCount(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/admin/getpatientwisecount');
  }
  // Doctor Year Month
  postCreate(param) : Observable<any> {
    console.log("Post"+JSON.stringify(param));
  
      return this._http.post('http://104.211.229.17:8084/v1/admin/getpwisecountfiltermy', param);
    
 
  }
  // Doctor
  postAll(par) : Observable<any> {
    console.log("Post"+JSON.stringify(par));
  
      return this._http.post('http://104.211.229.17:8084/v1/admin/getpatientwisecountfilter', par);
    
 
  }
}
