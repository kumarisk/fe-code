
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
export class AppointmentService {
  constructor(private _http:HttpClient) { }
  getApp(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/appointment/create');
   }
   getDoctors(specilization): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/appointment/getdoctor/'+specilization);
   }


   postCreate(param) : Observable<any> {
   console.log("Post"+JSON.stringify(param));
 
     return this._http.post('http://104.211.229.17:8084/v1/appointment/getappointments', param);
   ;

 }
 postSave(param) : Observable<any> {
    console.log("Post"+JSON.stringify(param));
   
     return this._http.post('http://104.211.229.17:8084/v1/appointment/create', param);
    ;
   }
}
