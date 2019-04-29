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
export class PaymentvoucherService {
  constructor(private _http:HttpClient) { }
  getId(): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/voucher/create');
  }
  getAll(count): Observable<any> {
    return this._http.get('http://104.211.229.17:8084/v1/Voucher/'+count);
   }

   edit(paymentNo,param): Observable<any>{    

    return this._http.put('http://104.211.229.17:8084/v1/voucher/updatevoucher/'+paymentNo,param);
}

getPdf(paymentNo): Observable<any> {
  return this._http.get('http://104.211.229.17:8084/v1/pdf/'+paymentNo);
 }
  
}
