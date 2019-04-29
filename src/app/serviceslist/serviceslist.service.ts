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
export class ServiceslistService {

  constructor(private _http:HttpClient) { }



  // getServices(): Observable<any> {
  //   return this._http.get('http://104.211.229.17:8084/v1/service/getservices',)
        
  // }
  // edit(serviceId,param) : Observable<any>{    

  //   return this._http.put('http://104.211.229.17:8084/v1/service/update/'+serviceId,param,
  //    )
   
  //   }
    //  104.211.229.17:8084/v1/service/list



getServices(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/service/list',)
        
  }

editdetails(serviceName): Observable<any>{
  return this._http.get('http://104.211.229.17:8084/v1/service/getService/'+serviceName)
}

edit(serviceName,param):Observable<any>{
  return this._http.post('http://104.211.229.17:8084/v1/service/update/'+serviceName,param)
}



}