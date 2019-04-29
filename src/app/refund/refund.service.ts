import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http'
import { Observable } from 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class RefundService {
  
  constructor(private _http:HttpClient) { }



  // getRefund(): Observable<any> {
    
  //       return this._http.get( 'http://104.211.229.17:8084/v1/sales/refund/create');
    
  //     }
  getAll(days): Observable<any> {
    return this._http.get("http://104.211.229.17:8084/v1/sales/return/list/" + days);
  }

  getPdf(billNo): Observable<any> {
    return this._http.get(
      "http://104.211.229.17:8084/v1/sales/return/pdf/" + billNo
    );
  }

}
