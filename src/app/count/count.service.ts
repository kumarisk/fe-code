import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
 import 'rxjs/add/operator/map';
 import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(private _http:HttpClient) { }
  getArray(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/admin/getyears');
  }
  postArray(userId,parm):Observable<any> {
    console.log("Post"+JSON.stringify(parm));
    return this._http.post('http://104.211.229.17:8084/v1/admin/getmonthwise/'+userId+'/',parm,);
  
  }

  postnew(parm):Observable<any> {
    console.log("Post"+JSON.stringify(parm));
    return this._http.post('http://104.211.229.17:8084/v1/admin/getPatientpost',parm,);
  
  }

 
}