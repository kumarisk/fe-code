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
export class AmbulancelistService {
  save(patAmbulanceId: (patAmbulanceId: any) => any, param: { "regNo": any; "billAmount": any; "paidTo": any; "amountStatus": any; "toTime": any; }): any {
    throw new Error("Method not implemented.");
  }

  constructor(private _http:HttpClient) { }
  getAllPatient(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/ambulance/getAll');
  }


  edit(patAmbulanceId,param): Observable<any>{    

    return this._http.put('http://104.211.229.17:8084/v1/ambulance/update/'+patAmbulanceId,param);
}
}