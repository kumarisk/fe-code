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
export class OpIpEditService {

  constructor(private _http:HttpClient) {

  
   }
 
   getDetails(billno): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/lab/cancel/find/'+billno);
  }

  deleteservice(labRegId): Observable<any> {
    return this._http.delete('http://104.211.229.17:8084/v1/lab/deleteService/'+labRegId);
  }

}
