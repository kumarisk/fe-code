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
export class DuebillsService {

  constructor(private _http:HttpClient) { }
  // getpatient(UMRno): Observable<any> {
  //   return this._http.get( 'http://104.211.229.17:8084/v1/due/get/'+UMRno, 
  //    );
  // }    
  // postCreate(UMRno,param) : Observable<any> {
  //   console.log("Post"+JSON.stringify(param));
   
  //   return this._http.post('http://104.211.229.17:8084/v1/due/get/create/'+UMRno, param);
  //   ;
  // }

  post(billno,param) : Observable<any> {
    console.log("Post"+JSON.stringify(param));
   
    return this._http.post('http://104.211.229.17:8084/v1/due/duepay/'+billno, param);
    ;
  }

 
 

    postref(param) : Observable<any> {
    console.log("Post"+JSON.stringify(param));
   
    return this._http.post('http://104.211.229.17:8084/v1/due/create', param);
   ;
    }

  getfull(): Observable<any> {
    return this._http.get( 'http://104.211.229.17:8084/v1/due/get/duelist' );
  }    


  
}