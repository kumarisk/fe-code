import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class OspbillingService {

  constructor(private _http:HttpClient) { }

  getdetails(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/osp/create');
  }

  getcost(param): Observable<any> {
    console.log("Post"+JSON.stringify(param));
   
    return this._http.post('http://104.211.229.17:8084/v1/osp/getcost ', param);
  }
  createservice(param): Observable<any> {
    console.log("Post"+JSON.stringify(param));
   
    return this._http.post('http://104.211.229.17:8084/v1/osp/create', param);
  }
}
