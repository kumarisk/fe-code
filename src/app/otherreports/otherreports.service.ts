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
export class OtherreportsService {

  constructor(private _http:HttpClient) { }


  getServices(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/lab/opservice');
  }
  getPatient(regid: string): Observable<any> {
    return this._http.get( 'http://104.211.229.17:8084/v1/patient/'+regid, 
     );
  }    

  // getInvoice(regid,invoice): Observable<any> {
  //   return this._http.put('http://104.211.229.17:8084/v1/lab/register/pay/'+regid+'/'+invoice,{});
  // }
  
  getCost(chargeName,regid): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/lab/opservice/'+chargeName +'/'+regid,{});
  }
  
  
  postCreate(param): Observable<any> {
    console.log("Post"+JSON.stringify(param));
   
    return this._http.post('http://104.211.229.17:8084/v1/lab/opservice', param);
  }

}